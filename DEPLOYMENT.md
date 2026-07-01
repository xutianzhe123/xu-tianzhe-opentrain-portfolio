# 部署说明

## 1. GitHub 仓库

建议仓库地址：

```text
https://github.com/xutianzhe123/xu-tianzhe-opentrain-portfolio
```

本地仓库已初始化，远端 `origin` 已指向上面的地址。远端仓库创建后执行：

```bash
git push -u origin main
```

## 2. GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`，推送到 `main` 后会自动构建并发布。

如首次部署未自动启用 Pages，请进入：

```text
GitHub Repo -> Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

Custom domain 使用：

```text
ywtnbzp.cn
```

## 3. 阿里云 DNS

根域名 `ywtnbzp.cn` 指向 GitHub Pages，添加 4 条 A 记录：

```text
主机记录: @    记录类型: A    记录值: 185.199.108.153
主机记录: @    记录类型: A    记录值: 185.199.109.153
主机记录: @    记录类型: A    记录值: 185.199.110.153
主机记录: @    记录类型: A    记录值: 185.199.111.153
```

如希望 `www.ywtnbzp.cn` 也可访问，再添加：

```text
主机记录: www    记录类型: CNAME    记录值: xutianzhe123.github.io
```

DNS 生效后，在 GitHub Pages 页面勾选 `Enforce HTTPS`。
