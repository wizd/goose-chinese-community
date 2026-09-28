import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const buildDir = path.join(root, "build");
const staging = fs.mkdtempSync(path.join(os.tmpdir(), "goose-deploy-"));
const indexFile = path.join(os.tmpdir(), `goose-deploy-index-${process.pid}`);

function git(args, capture = false) {
  const result = execFileSync("git", ["-c", "core.autocrlf=false", ...args], {
    cwd: root,
    env: { ...process.env, GIT_INDEX_FILE: indexFile },
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
    maxBuffer: 64 * 1024 * 1024,
  });
  return capture ? result.trim() : "";
}

try {
  if (!fs.existsSync(path.join(buildDir, "index.html"))) {
    console.error("缺少 build/index.html。请先运行 npm run build");
    process.exit(1);
  }

  const remotes = git(["remote"], true).split(/\r?\n/).filter(Boolean);
  if (!remotes.includes("origin")) {
    console.error("没有 origin。请先把仓库推到 wizd/goose-chinese-community。");
    process.exit(1);
  }

  fs.cpSync(buildDir, path.join(staging, "public"), { recursive: true });
  fs.copyFileSync(path.join(root, "deploy", "Dockerfile"), path.join(staging, "Dockerfile"));
  fs.copyFileSync(path.join(root, "deploy", "nginx.conf"), path.join(staging, "nginx.conf"));

  git(["read-tree", "--empty"]);
  git(["--work-tree", staging, "add", "-A"]);
  const tree = git(["write-tree"], true);
  const commit = git(
    ["commit-tree", tree, "-m", "Publish static site for Coolify"],
    true,
  );
  git(["update-ref", "refs/heads/deploy", commit]);
  git(["push", "--force", "origin", "refs/heads/deploy:refs/heads/deploy"]);
  console.log(`已覆盖 origin/deploy（${commit.slice(0, 12)}）。master 未改。`);
} finally {
  fs.rmSync(staging, { recursive: true, force: true });
  fs.rmSync(indexFile, { force: true });
}
