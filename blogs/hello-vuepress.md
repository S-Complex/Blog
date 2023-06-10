---
title: Hello VuePress
date: 2023/6/10
---

最近花了一些时间研究怎么造新博客，后面摆烂了，先用 VuePress 2 + VuePress-Reco 2。

## 为什么抛弃 Hexo

Hexo 算是一个 HTML 代码拼接器，其实在很多方面，Hexo 并不能给予太多帮助，还是得靠你自己来。

之前打算把 Icarus 主题推掉的时候，我就尝试着用 Bulma 自己写一个主题，但是最后失败了。后面，Hexo 也找不到自己心仪的主题，干脆尝试寻求其他道路。

## 为什么是 VuePress?

VuePress 我用的 2.0 版本，仍处于 beta，默认的 webpack 换成了 vite。

### VitePress

这个其实已经开项目研究了，并且 [bingling_sama](https://github.com/bingling-sama) 正在尝试帮我融合 Vuetify 进去。

难度还是太大了，而且现在算是比较急。在造 VuePress 2 + Reco 的时候，发现热重载好像是有一点问题的，这没办法。

### Next.js

Next.js 其实我已经搞出来案例了，但是 MUI 要实现我心目中的样式还是有点难，并且在 Markdown 转 HTML 然后让 React 识别这一块，我有点难去处理，最后废置。

## 目前的情况

我不打算给每篇文章细分了，比如分类和标签这些的。因为我创作出来的东西真的太杂了，一时半会不知道怎么分，干脆砍了。

Blog Banner 是我在市内某个地方拍的，后期搞了一下感觉还行，等 Library 搞好就放上去。

然后，其实和往常没有什么区别了，性能不是很清楚。

## 是否开源？

换到这一代博客之后，我打算从 Cloudflare Workers Site 迁移到 Vercel，Cloudflare 的任务就是当一个解析和防火墙，还有什么我仍需要的功能。

而我的项目都在组织里，Vercel 绑定组织项目需要付费，用了一个 GitHub Actions 部署上去。

并且写这个 Workflow 脚本不会泄露信息，所以开源。~~只要各位不嫌弃屎山就行~~

## 文章

毕竟写了这么多流水账，我打算先把这个新造好的博客扔上去之后，再慢慢恢复文章，反正得重写。

在恢复文章之前，我还有一个 Library 可能要重造，别急.jpg