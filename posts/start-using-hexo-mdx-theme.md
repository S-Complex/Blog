---
title: 开始使用 Hexo MDx 主题
date: 2022-08-01 10:51:46
tags:
categories: 报告

---

在博客用 WordPress 那几个月里，除了调试主题的时间之外，我基本在用 Axton 开发的 MDx 主题。换回 Hexo 之后，我也是对 MDx 念念不忘，直到我某天在 GitHub 搜索 MDUI 主题，发现有位开发者也开发了 Hexo 版本的 MDx 主题。Cheers!

本篇文章作为一个标志性文章，自然不能在那里打流水账说我怎么开始使用的。那就来说说，从发现这个主题到开始用这个主题，这隔开的时间里面到底发生了什么吧。

<!--more-->

在我还没有发现这个主题之前，作者（以下用她的英文名 Yuameshi 进行称呼）只适配了两个评论系统（一个是 Gitalk，一个是 utterances）。而我在 Hexo 用的评论系统是我调教好了的 Waline，显然是不支持的。

## 提供建议

火速去 GitHub 开议题。本来想着用英文写议题起码让非中国人看懂，结果......作者一眼认出这是纯正的 **中式英语**。

*en-US 翻车了，我火速换回了 zh-CN*

Yuameshi 表示写出来是没什么问题的，但是 hexo-theme-MDx 它是自带多 CDN 支持的，而且 Waline 在每个公共 CDN 库的链接样式不太一样，比如说：

> jsDelivr / Unpkg 的 Waline 包名是 `@waline/client`，与 npm 保持一致
> 
> bootcdn 和其它类似 CDN 的 Waline 包名则是 `waline`

但这个并不是太难，然后她光速重构了一段代码（雾）。

我去看了一眼，bytedance CDN 里的 Waline 还是 1.x 版本，甚至还有一个更诡异的现象（大多数库的上传时间基本 2021-8-15 / 2022-3-1）；staticfile 在它的首页没有登载，但是 Yuameshi 直接访问就发现有这个资源。

嗯，就这样，昨天晚上 Yuameshi 完成了对 Waline / Valine 评论系统的适配。

## 测试

Yuameshi 将适配后的代码内容上传到了 GitHub。

我拉取了下来，并在 localhost 进行测试。测试结果是：Waline 每一个内容都能够正常工作。于是火速通知 Yuameshi，Waline 可以转 stable 了。

## 使用

当晚 Yuameshi 就上传了 npm 包，我就火速安装并且正式使用。

首图是那兔壁纸，来源于翼下之风微博 2022 年初发布的图片，应用于 2022 日历周边。

侧边栏头图链接： https://api.dujin.org/bing/1920.php
