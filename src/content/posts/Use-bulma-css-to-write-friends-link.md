---
title: 使用 Bulma CSS 重写友链列表
date: 2022-07-22
description: 用 Bulma CSS 写一个速度能接受的友链列表。
banner: https://library.restent.win/images/postBanners/use-bulma-css-to-write-friends-link.webp
---

之前用 NexT 8 主题的时候，因为背景不自带自适应功能，所以在手机以及某些分辨率低的设备下看我的博客，背景就真的一言难尽。在多位朋友的催促，以及 Icarus 终于发布了支持 Hexo 6 的 Release Version 之后，我把我的博客主题改成了 Icarus 5。不过调试的时候发现原来的友链卡片会导致整个页面出 Bug（反正惨不忍睹就是了），[@Nofated](https://blog.nofated.win) 就推荐我用 Bulma CSS 写友链卡片。

<!--more-->

先贴上我的代码样式，成品可以前往 [Friends](https://library.restent.win/links) 查看。

``` html
<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-128x128">
        <img src="{image link}" width=128 height=128>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{friends name}</strong> <button class="button is-small is-link"><a href="{website link}">Go!</a></button>
          <br>
          {slogan}
        </p>
      </div>
    </div>
  </article>
  <article class="media">
    <div class="media-left">
      <figure class="image is-128x128">
        <img src="{image link}" width=128 height=128>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{friends name}</strong> <button class="button is-small is-link"><a href="{website link}">Go!</a></button>
          <br>
          {slogan}
        </p>
      </div>
    </div>
  </article>
</div>
```

由于不太会写那种解说文，我对这个结构的构思会以 Q&A 方式进行解释。

## 为什么不是卡片？

说实在，我个人也是认为卡片美观一些，甚至在此之前我博客的友链页面都是用的卡片列表。但是这一次，使用卡片的情况下出现了错位现象，目前暂时找不出问题所在，所以用了最基础的 Box。

另外，由于每个人的 Slogan 有长有短，使用 Bulma CSS 写制的卡片并不会将过长的内容进行隐藏，而是直接堆叠上去。如果使用卡片并且遇到了比较长的 Slogan，那么也可能会出现一些错位问题。目前我这里用 Box 写制的卡片可以显示至少两行的 Slogan 内容，所以一段时间博客的友链卡片只会使用 Box。

> 另外的理由就是，我参考了一下 [@Nofated](https://blog.nofated.win) 的友链代码，注意到卡片和 Box 的代码相差太大。而我这边早就把友链加完了，如果真要调回卡片的话还不知道要多久呢（悲）。

## Go! 按钮

### 为何要加进来

问了一圈，Bulma CSS 并没有标明如何点击一个区域访问一个链接（就是点击卡片跳转到一个链接那样），目前的方法就是引入链接到某些文字里，或者添加一个可用的按钮。

我原来的想法是把链接引用到每个友链的名称和 Slogan 上，但考虑到这样好像还是不周全，所以就添加了一个 Go! 按钮（灵感来源于 `vuepress-theme-reco 1.x` 的链接区）。

### 为什么不向右对齐？

其实我也考虑过这个问题，但是我尝试了官方指明的写法，并不能让这个按钮向右对齐。有时间的话我再深究一下。

## 已经有人做了为 Icarus 而生的卡片，为何我不用呢？

这个卡片需要动到 Icarus 主题文件夹的内部，而我是通过 npm 方式安装的 Icarus 主题。

在用 Hexo 主题的各位都了解，`node_modules` 文件夹被写入了 `.gitignore`，也就是 node_modules 里的所有组件文件夹都不会上传到 GitHub，在 Vercel 构建时也只会通过读取 `package.json` 来获取 npm 包构建。这个问题其实把 Icarus 主题扔进 `themes` 文件夹即可，但用 npm 包有什么好处，我觉得大家应该都懂。 