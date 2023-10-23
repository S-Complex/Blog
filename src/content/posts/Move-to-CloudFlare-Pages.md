---
title: 记一次迁移至 Cloudflare Pages
date: 2021-05-15
description: 将自己的两个站点迁移到 Cloudflare Pages 的浅记录。
---

## Vercel 被墙

最近一段时间，我发现自己托管在 Vercel 上的网站速度很慢（包括主页和博客），甚至出现了无法打开的情况。顺带看了一下隔壁 [GPlane 的博客](https://blog.gplane.win)，好家伙，他放在 Vercel 上的博客也是这么个问题。

在 LittleSkin 社区群浅聊了一下，哦吼，Vercel 貌似是挨墙了，目前就只能先不用 Vercel 了。那么就趁着这个机会，试试前不久看到的、Cloudflare 新出的 Pages 服务吧。

## 迁移到 CF Pages 的想法

之前 Misaka13514 发了 [一篇文章](https://blog.atri.tk/2021/deploy-frontend-to-cfpages/)，那会 Cloudflare Pages 刚出不久他就把自己的博客迁移了上去，末尾还给出了相关的 PageSpeed 成绩，虽然延迟高但还是属于可以接受的范围。

而我嘛，Github Pages 肯定是不可能回去用了的，因为我有两个网站项目，那就 CloudFlare Pages 吧。

## 开始动工

这一部分简直是随便说说都可以。

先是在 Dynadot 上把 NS 服务器改成 CloudFlare 的，然后在 CloudFlare 上添加解析。

> 其实完全没必要，因为 Cloudflare Pages 只要 CNAME 解析上去就可以绑定域名了，不像 Workers 那样必须要域名在 Cloudflare 解析上。

然后进入 CloudFlare Pages，添加项目。*因为目前我就只有 Github 账户，所以只限制 Github 项目对我来说根本没有影响。*博客我一直在用自动部署，而 CloudFlare Pages 正好有 VuePress 的自动部署，我再按照实际情况填写了一下 Build Command 和 Output Directory，然后就部署成功了。

主页更加简单，只需要把 dist 里的文件扔到一个 Github 仓库，然后再新开一个 CloudFlare Pages 项目，导向这个仓库，再无脑下一步，就部署成功了。

解析好的域名可以直接在 CloudFlare Pages 控制台里添加，不需要去域名控制台自己弄，感觉还是很不错的。

## 效果

裸连了一下，感觉速度和 Vercel 不相上下，还是很不错的。