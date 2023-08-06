---
title: 神不知鬼不觉，偷偷摸摸升级站点
date: 2023-08-06
isOriginal: true
category: 手工活
---

因为升级完站点脑子都在嗡嗡响，所以就分板块来概述一下吧。

## 个人主页

参考了比较多朋友的个人主页，最终还是决定在个人主页展示英文版的自我简介（概述）；原本计划挪动到 Library 的概述改为中文版，并且与组织简介共存。

这次的简介分成了三个板块，一个是非常简洁的自我介绍（像极了你刚上高中给新同学做自我介绍的话术），一个是我现在在给哪里打工（确信，虽然我是摸鱼佬），最后一个便是我喜欢什么。

侧边栏的 Quick Access 也增加了快捷项，分别为 `中文版简介` 和 `Contact`。

## 博客

在访问的时候你可能发现了：我又又又又又换框架了。是的，我这次换了 VuePress 2 + VuePress Hope Next。

虽然之前的计划是和 [冰凌](https://booling.cn) 整出来一个基于 Vuetify 的 VuePress 主题，再把博客迁移到 VuePress。但 VuePress 2 的主题开发和 VuePress 1 大不一样，Hexo 的纯 HTML 战术我也不是十分的满意，就先用 VuePress Hope 替代了。

~~麻了，我也没想到 Hope 的配置项那么复杂.webp~~

切换到 VuePress 之后，分类限时回归（也可能是常驻），标签的话暂时不会恢复。

## 档案馆（Library）

和上面同理，不过为了性能，所以选用了 VitePress，其余没有什么大变动。

顺便重写了友链，但不知道是因为什么奇怪的毛病，生成静态文件后扔到 `.vitepress/public/links` 下，内容就是一片空白，可能是因为设置的一些问题。

好在问题不大，在 Vercel 上创建一个项目，然后再 `vc --prod` 就可以了，名义上继续归属 Library 即可。

## 更名

考虑到一些有的没的，网站目前更名：

- 个人主页：Restent × SliverRiver
- 博客：Restent's Notebook
- 档案馆：SliverRiver's Library