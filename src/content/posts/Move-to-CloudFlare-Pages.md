---
title: 记一次迁移至 Cloudflare Pages
date: 2021-05-15
description: 将自己的两个站点迁移到 Cloudflare Pages 的浅记录。
---

## Vercel：从变慢到被墙

最近一段时间，我发现自己托管在 Vercel 上的两个站点的访问速度开始变慢，到后面甚至变成了无法打开的状态。顺带看了一下隔壁也将站点放在 Vercel 的、GPlane 的博客，他的站点也是这么一个情况，感觉要寄。

事实如此，在 LittleSkin Community 里聊了一下，Vercel 多半是被墙了，只能先一段时间不用 Vercel 了。那么趁着这个机会，我也来试试 Cloudflare 新出的 Pages 服务吧~

## What is Cloudflare Pages? And Why?

会知道 Cloudflare Pages 是看到 Misaka13514 的 [这一篇文章](https://blog.atri.tk/2021/deploy-frontend-to-cfpages/)。Cloudflare Pages 跟 Vercel 和 Netlify 差不多，都是一个具有自动化的全栈网站构建与托管服务。

Misaka13514 是在 3 月份开始用的，那个时候 Cloudflare Pages 刚稳定下来，不过限制和问题比较多；时间转到 5 月，我用的时候已经没有那么多问题了，不过它的环境初始化需要比较久。唉，新服务，谅解谅解。

## Now, move to Cloudflare Pages。

这一部分简直是随便说说都可以。

我的第一步是将域名的 NameServer 更改到了 Cloudflare 那边。其实完全没必要，因为 Cloudflare Pages 只要 CNAME 解析上去就可以绑定域名了，不像 Workers 那样、强制要求绑定的域名已添加到 Cloudflare。

然后进入 Cloudflare Pages，添加项目。导入这一方面，Cloudflare Pages 目前只支持通过 GitHub 导入，不过我只用 GitHub 所以也没什么。博客我一直在用CI 部署，而 CloudFlare Pages 正好有 VuePress 的 CI 部署模板，我再按照实际情况更改了一下 Build Command 和 Output Directory，就部署成功了。

主页当然更简单啦，把 dist 里的内容扔到一个 GitHub 仓库，新开一个 Cloudflare Pages 项目并导入这个仓库，什么模板都不用设置直接冲部署。不用自动 CI 是因为目前用的这个主页项目需要调用 Chromium 进行打开测试，一到自动 CI 服务器就没办法 pass，只得本地。

给 Cloudflare Pages 项目添加域名时，如果你添加的域名已经使用了 Cloudflare 解析，那么在 Pages 这边添加后、Cloudflare 会自动为你添加对应的解析，简直不要太方便。

## 效果

裸连尝试了一下，和 Vercel 不相上下，就这样吧~