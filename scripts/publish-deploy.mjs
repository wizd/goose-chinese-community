import { execFileSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const repo = "wizd/goose-chinese-community";

function run(command, args, capture = false) {
  const result = execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  return capture ? result.trim() : "";
}

const dirty = run("git", ["status", "--porcelain"], true);
if (dirty) {
  console.error("工作区有未提交的改动。提交并留在 master 后再发布。");
  process.exit(1);
}

const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"], true);
if (branch !== "master") {
  console.error(`当前在 ${branch}。请在 master 上发布。`);
  process.exit(1);
}

run("git", ["push", "origin", "master"]);
run("gh", ["workflow", "run", "publish-site.yml", "--repo", repo, "--ref", "master"]);

let runId = "";
for (let attempt = 0; attempt < 30 && !runId; attempt += 1) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 2000);
  const listed = run(
    "gh",
    [
      "run",
      "list",
      "--repo",
      repo,
      "--workflow",
      "publish-site.yml",
      "--limit",
      "1",
      "--json",
      "databaseId,status,headSha",
    ],
    true,
  );
  const latest = JSON.parse(listed)[0];
  if (!latest) {
    continue;
  }
  const head = run("git", ["rev-parse", "HEAD"], true);
  if (latest && latest.headSha === head && latest.status !== "completed") {
    runId = String(latest.databaseId);
  }
}

if (!runId) {
  console.error("没有等到 GitHub Actions 开始。请到 Actions 页查看 publish-site。");
  process.exit(1);
}

run("gh", ["run", "watch", runId, "--repo", repo, "--exit-status"]);
console.log(
  `镜像已推到 ghcr.io/wizd/goose-chinese-community，deploy 分支只保留一行 FROM。Coolify 会拉取这个镜像。运行：gh run view ${runId}`,
);
