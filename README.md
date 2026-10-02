# goose 中文社区

goose 官方文档站的双语副本，域名预定为 [goose.vcorp.ai](https://goose.vcorp.ai/)。英文原文跟踪 [aaif-goose/goose](https://github.com/aaif-goose/goose) 的 `documentation/`。中文放在 `i18n/zh-Hans/`，不改英文 Markdown。

中文界面里的桌面版和命令行下载指向 [goose-update.vcorp.ai](https://goose-update.vcorp.ai/)。英文界面仍使用上游 GitHub 安装地址。

## 本地预览

```bash
npm install
npm start
```

`npm start` 一次只提供默认语言（英文）。预览中文：

```bash
npm start -- --locale zh-Hans
```

两种语言同时可访问，并且首次访问会按浏览器语言自动切换，需要先构建再启动：

```bash
npm run build
npm run serve
```

导航栏的语言菜单会记住选择。生产构建里，第一次打开站点时，浏览器语言以 `zh` 开头会进入 `/zh-Hans/`，否则留在英文。

## 发布到 Coolify

构建和镜像推送在 GitHub Actions 里完成。静态文件不进 Git。Coolify 仍跟踪 `deploy` 分支，但这个分支只有一行 `FROM`，指向 `ghcr.io/wizd/goose-chinese-community`。

```bash
npm run publish-deploy
```

先把要发布的改动提交到 `master`。`publish-deploy` 会推送 `master`，然后等待 Actions：在云端 `npm run build`，把镜像推到 GHCR，再把 `deploy` 分支改成该镜像的 `FROM`。Coolify 看到 `deploy` 更新后拉取镜像，端口仍是 `8080`。

## 上游同步

`UPSTREAM.json` 记录当前对齐的上游 commit。译文对应的英文 blob 记在 `i18n/zh-Hans/translation-meta.json`。操作步骤、本地补丁和译完后如何改账本，见 [中文同步更新.md](中文同步更新.md)。

```bash
npm run sync-upstream
```

脚本会 `git fetch` 官网仓库的 `main`，对 `documentation/` 做 `git diff`，更新未改过的英文文件，并写出 `SYNC_REPORT.md`：

- 英文有改动、且已有中文的篇目列为「需要重译」
- 新增且还没有中文的篇目列为「新增待译」
- 英文删除时，对应中文一并删除
- `docusaurus.config.ts`、首页、社区页、扩展页和本 README 是本地补丁。上游如果也改了这些文件，脚本只报告冲突，不覆盖

只查看某段上游历史、不写文件：

```bash
node scripts/sync-upstream.mjs --dry-run --from <旧 commit> --to upstream/main
```

重译时保留命令、环境变量、组件标签和链接目标，把英文 diff 的意思补进现有中文，不要整篇推倒。
