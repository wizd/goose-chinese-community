import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const UPSTREAM_URL = "https://github.com/aaif-goose/goose.git";
const UPSTREAM_REF = "main";
const DOC_PREFIX = "documentation/";
const META_PATH = path.join(ROOT, "i18n", "zh-Hans", "translation-meta.json");
const UPSTREAM_PATH = path.join(ROOT, "UPSTREAM.json");
const REPORT_PATH = path.join(ROOT, "SYNC_REPORT.md");
const CHINESE_DOWNLOAD = "https://goose-update.vcorp.ai/";

const PROTECTED = new Set([
  "docusaurus.config.ts",
  "README.md",
  "src/pages/index.tsx",
  "src/pages/community/index.tsx",
  "src/pages/extensions/index.tsx",
  "src/pages/extensions/detail.tsx",
  "src/components/MacDesktopInstallButtons.js",
  "src/components/WindowsDesktopInstallButtons.js",
  "src/components/LinuxDesktopInstallButtons.js",
  "src/components/OnboardingProviderSetup.js",
  "src/components/ModelSelectionTip.js",
  "src/components/RateLimits.js",
]);

const DOWNLOAD_BUTTONS = new Set([
  "src/components/MacDesktopInstallButtons.js",
  "src/components/WindowsDesktopInstallButtons.js",
  "src/components/LinuxDesktopInstallButtons.js",
]);

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: ROOT,
    maxBuffer: 64 * 1024 * 1024,
    ...options,
  });
}

function gitText(args) {
  return git(args, { encoding: "utf8" }).trim();
}

function posix(filePath) {
  return filePath.split(path.sep).join("/");
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureRemote() {
  const remotes = gitText(["remote"]).split(/\r?\n/).filter(Boolean);
  if (!remotes.includes("upstream")) {
    gitText(["remote", "add", "upstream", UPSTREAM_URL]);
  }
}

function translationRel(rel) {
  if (rel.startsWith("docs/") && (rel.endsWith(".md") || rel.endsWith(".mdx") || rel.endsWith("_category_.json"))) {
    return posix(path.join("i18n/zh-Hans/docusaurus-plugin-content-docs/current", rel.slice("docs/".length)));
  }
  if (rel.startsWith("blog/") && (rel.endsWith(".md") || rel.endsWith(".mdx"))) {
    return posix(path.join("i18n/zh-Hans/docusaurus-plugin-content-blog", rel.slice("blog/".length)));
  }
  if (rel.startsWith("src/pages/") && (rel.endsWith(".md") || rel.endsWith(".mdx"))) {
    return posix(path.join("i18n/zh-Hans/docusaurus-plugin-content-pages", rel.slice("src/pages/".length)));
  }
  return null;
}

function listUpstreamFiles(commit) {
  const output = gitText(["ls-tree", "-r", "--name-only", commit, "documentation"]);
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .map((file) => file.slice(DOC_PREFIX.length));
}

function upstreamBlob(commit, rel) {
  try {
    return gitText(["rev-parse", `${commit}:${DOC_PREFIX}${rel}`]);
  } catch {
    return null;
  }
}

function readUpstream(commit, rel) {
  return git(["show", `${commit}:${DOC_PREFIX}${rel}`]);
}

function assetMirrorRel(rel) {
  const ext = path.extname(rel).toLowerCase();
  if (ext === ".md" || ext === ".mdx" || ext === ".json" || ext === "") {
    return null;
  }
  if (rel.startsWith("docs/")) {
    return posix(path.join("i18n/zh-Hans/docusaurus-plugin-content-docs/current", rel.slice("docs/".length)));
  }
  if (rel.startsWith("blog/")) {
    return posix(path.join("i18n/zh-Hans/docusaurus-plugin-content-blog", rel.slice("blog/".length)));
  }
  return null;
}

function writeLocal(rel, bytes) {
  const destination = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, bytes);
  const mirror = assetMirrorRel(rel);
  if (mirror) {
    const mirrored = path.join(ROOT, mirror);
    fs.mkdirSync(path.dirname(mirrored), { recursive: true });
    fs.writeFileSync(mirrored, bytes);
  }
}

export function applyDownloadLocale(source) {
  if (source.includes("useDownloadHref")) {
    return source;
  }
  let next = source;
  if (!next.includes("@site/src/utils/download-href")) {
    next = `import { useDownloadHref } from "@site/src/utils/download-href";\n${next}`;
  }
  next = next.replace(
    /to="(https:\/\/github\.com\/aaif-goose\/goose\/[^"]+)"/g,
    'to={useDownloadHref("$1")}',
  );
  next = next.replace(
    /to=\{downloadUrls\.(deb|rpm|flatpak)\}/g,
    "to={useDownloadHref(downloadUrls.$1)}",
  );
  return next;
}

function ensurePackageScript(bytes) {
  const pkg = JSON.parse(bytes.toString("utf8"));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["sync-upstream"] = "node scripts/sync-upstream.mjs";
  pkg.scripts["publish-deploy"] = "node scripts/publish-deploy.mjs";
  return Buffer.from(`${JSON.stringify(pkg, null, 2)}\n`);
}

function materialize(rel, bytes) {
  let next = bytes;
  if (rel === "package.json") {
    next = ensurePackageScript(next);
  }
  if (rel === "static/CNAME") {
    next = Buffer.from("goose.vcorp.ai\n");
  }
  if (DOWNLOAD_BUTTONS.has(rel)) {
    next = Buffer.from(applyDownloadLocale(next.toString("utf8")));
  }
  return next;
}

function parseDiff(oldCommit, newCommit) {
  const output = gitText([
    "diff",
    "--name-status",
    "--find-renames",
    oldCommit,
    newCommit,
    "--",
    "documentation",
  ]);
  const changes = [];
  for (const line of output.split(/\r?\n/).filter(Boolean)) {
    const parts = line.split("\t");
    const status = parts[0];
    if (status.startsWith("R") || status.startsWith("C")) {
      changes.push({
        status: "R",
        from: parts[1].slice(DOC_PREFIX.length),
        to: parts[2].slice(DOC_PREFIX.length),
      });
    } else {
      changes.push({
        status: status[0],
        file: parts[1].slice(DOC_PREFIX.length),
      });
    }
  }
  return changes;
}

function shortDiff(oldCommit, newCommit, rel) {
  try {
    return gitText([
      "diff",
      "--unified=1",
      oldCommit,
      newCommit,
      "--",
      `${DOC_PREFIX}${rel}`,
    ]).slice(0, 4000);
  } catch {
    return "";
  }
}

function loadMeta() {
  return readJson(META_PATH, {});
}

function reportTranslation(meta, rel, newCommit, bucket) {
  const translated = translationRel(rel);
  if (!translated) {
    return;
  }
  const blob = upstreamBlob(newCommit, rel);
  const recorded = meta[rel];
  const exists = fs.existsSync(path.join(ROOT, translated));
  if (!exists) {
    bucket.untranslated.push({ rel, translated, blob });
    return;
  }
  if (recorded && recorded !== blob) {
    let diff = "";
    try {
      diff = gitText(["diff", "--unified=1", recorded, blob]).slice(0, 4000);
    } catch {
      diff = "";
    }
    bucket.stale.push({ rel, translated, blob, diff });
  }
}

function writeReport(title, sections) {
  const lines = [`# ${title}`, ""];
  for (const section of sections) {
    lines.push(`## ${section.title}`, "");
    if (section.lines.length === 0) {
      lines.push("无。", "");
      continue;
    }
    lines.push(...section.lines, "");
  }
  fs.writeFileSync(REPORT_PATH, lines.join("\n"));
}

function parseArgs(argv) {
  const args = { dryRun: false, from: null, to: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--from") {
      args.from = argv[index + 1];
      index += 1;
    } else if (arg === "--to") {
      args.to = argv[index + 1];
      index += 1;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureRemote();
  gitText(["fetch", "upstream", UPSTREAM_REF]);
  const newCommit = gitText(["rev-parse", args.to || "upstream/main"]);
  const state = readJson(UPSTREAM_PATH, {
    remote: UPSTREAM_URL,
    ref: UPSTREAM_REF,
    commit: null,
    path: "documentation",
    protectedBlobs: {},
  });
  const oldCommit = args.from ? gitText(["rev-parse", args.from]) : state.commit;
  const meta = loadMeta();

  if (!oldCommit) {
    const files = listUpstreamFiles(newCommit);
    const protectedNotes = [];
    if (!args.dryRun) {
      for (const rel of files) {
        if (PROTECTED.has(rel)) {
          state.protectedBlobs[rel] = upstreamBlob(newCommit, rel);
          protectedNotes.push(`- \`${rel}\` 保留本地版本`);
          continue;
        }
        writeLocal(rel, materialize(rel, readUpstream(newCommit, rel)));
      }
      fs.writeFileSync(path.join(ROOT, "static", "CNAME"), "goose.vcorp.ai\n");
      state.commit = newCommit;
      state.remote = UPSTREAM_URL;
      state.ref = UPSTREAM_REF;
      state.path = "documentation";
      writeJson(UPSTREAM_PATH, state);
      writeJson(META_PATH, meta);
    }
    writeReport(`上游基线 ${newCommit}`, [
      {
        title: "说明",
        lines: [
          args.dryRun
            ? "dry-run：尚未记录基线，正式运行会把未受保护的英文文件对齐到 upstream/main。"
            : `英文站已对齐到 upstream/main \`${newCommit}\`。`,
          `中文发行站：${CHINESE_DOWNLOAD}`,
        ],
      },
      { title: "未覆盖的本地文件", lines: protectedNotes },
    ]);
    console.log(fs.readFileSync(REPORT_PATH, "utf8"));
    return;
  }

  const changes = parseDiff(oldCommit, newCommit);
  const conflicts = [];
  const updated = [];
  const deleted = [];
  const bucket = { stale: [], untranslated: [] };

  for (const change of changes) {
    if (change.status === "R") {
      const fromProtected = PROTECTED.has(change.from) || PROTECTED.has(change.to);
      if (fromProtected) {
        conflicts.push(`- 重命名 \`${change.from}\` → \`${change.to}\` 触及受保护文件，未自动覆盖`);
        continue;
      }
      if (!args.dryRun) {
        if (fs.existsSync(path.join(ROOT, change.from))) {
          fs.rmSync(path.join(ROOT, change.from));
        }
        writeLocal(change.to, materialize(change.to, readUpstream(newCommit, change.to)));
        const fromTranslation = translationRel(change.from);
        const toTranslation = translationRel(change.to);
        if (fromTranslation && toTranslation && fs.existsSync(path.join(ROOT, fromTranslation))) {
          fs.mkdirSync(path.dirname(path.join(ROOT, toTranslation)), { recursive: true });
          fs.renameSync(path.join(ROOT, fromTranslation), path.join(ROOT, toTranslation));
          meta[change.to] = meta[change.from];
          delete meta[change.from];
        }
      }
      updated.push(`- 重命名 \`${change.from}\` → \`${change.to}\``);
      reportTranslation(meta, change.to, newCommit, bucket);
      continue;
    }

    const rel = change.file;
    if (change.status === "D") {
      if (PROTECTED.has(rel)) {
        conflicts.push(`- 上游删除了受保护文件 \`${rel}\`，本地保留`);
        continue;
      }
      if (!args.dryRun && fs.existsSync(path.join(ROOT, rel))) {
        fs.rmSync(path.join(ROOT, rel), { force: true });
      }
      const mirror = assetMirrorRel(rel);
      if (!args.dryRun && mirror && fs.existsSync(path.join(ROOT, mirror))) {
        fs.rmSync(path.join(ROOT, mirror), { force: true });
      }
      const translated = translationRel(rel);
      if (translated && fs.existsSync(path.join(ROOT, translated))) {
        if (!args.dryRun) {
          fs.rmSync(path.join(ROOT, translated), { force: true });
          delete meta[rel];
        }
        deleted.push(`- \`${rel}\`（已删除中文 \`${translated}\`）`);
      } else {
        deleted.push(`- \`${rel}\``);
      }
      continue;
    }

    if (PROTECTED.has(rel)) {
      const previous = state.protectedBlobs?.[rel];
      const blob = upstreamBlob(newCommit, rel);
      if (previous && previous !== blob) {
        conflicts.push(`- \`${rel}\` 上游有改动。本地补丁未覆盖。\n\n\`\`\`diff\n${shortDiff(oldCommit, newCommit, rel)}\n\`\`\``);
      }
      continue;
    }

    if (!args.dryRun) {
      writeLocal(rel, materialize(rel, readUpstream(newCommit, rel)));
    }
    updated.push(`- \`${change.status}\` \`${rel}\``);
    reportTranslation(meta, rel, newCommit, bucket);
  }

  if (!args.dryRun && !args.from) {
    state.commit = newCommit;
    writeJson(UPSTREAM_PATH, state);
    writeJson(META_PATH, meta);
    fs.writeFileSync(path.join(ROOT, "static", "CNAME"), "goose.vcorp.ai\n");
  }

  const staleLines = bucket.stale.flatMap((item) => [
    `- \`${item.rel}\` → \`${item.translated}\``,
    "",
    "```diff",
    item.diff || "(无文本 diff)",
    "```",
  ]);
  const untranslatedLines = bucket.untranslated.map(
    (item) => `- \`${item.rel}\` → \`${item.translated}\``,
  );

  writeReport(`上游变更 ${oldCommit.slice(0, 10)}..${newCommit.slice(0, 10)}`, [
    {
      title: "说明",
      lines: [
        args.dryRun ? "dry-run：没有写入英文文件，也没有推进 UPSTREAM.json。" : `已同步到 \`${newCommit}\`。`,
        "中文需要更新的篇目见下方。命令、环境变量和组件标签保持原文，只把英文 diff 的意思补进现有译文。",
      ],
    },
    { title: "英文文件", lines: updated },
    { title: "删除", lines: deleted },
    { title: "受保护文件冲突", lines: conflicts },
    { title: "需要重译", lines: staleLines },
    { title: "尚无译文", lines: untranslatedLines },
  ]);
  console.log(fs.readFileSync(REPORT_PATH, "utf8"));
}

const entry = process.argv[1] || "";
if (entry.endsWith("sync-upstream.mjs")) {
  main();
}
