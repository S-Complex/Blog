---
title: “真·只要快就行” | 写一个对国内友好的友链页
date: 2023-02-27
description: 将友链拆出来并独立化、卡片样式进行调整、优化友链头像加载速度。
---

## 先有的想法

自从那次从南宁回来之后，我才终于想起来这个我好久都没管过的网站了。并且，因为博客（这里）和摄影站（隔壁 Galaxy Sky）是同步运行的，Galaxy Sky 理论来说也有接受友链的能力，但友链这个部分恰好仅在 Galaxy City 里。我就寻思着，反正两个站都有接受友链的能力，那也不能只放一个站吧，想了半天想出一个鬼点子：拆出来独立化。

看到这里，熟悉我的人都知道我要干什么了（类似多开一个 `friends.restent.win` 这样）。没错，我之前确实这么想，但是后面我想到要不要把 Images 和 Pages 叠在一个域名下，就是这么正好，干脆把友链也扔进去得了。

> 现在施工其实也差不多结束了，你们应该也知道叠起来的这个站叫什么了。没错，就是 SliverRiver Library，这里的 Library 代指 **库**，而不是普通意义的图书馆之类的。

那么，想都想好了，再不动手就对不起自己画的大饼了（逃

## 修页面代码

自从换到 Bulma 之后，页面统一相比使用 MDUI 更为简易，并且一份代码可以套用。因此，友链页面代码来自 SliverRiver's Hub 源码。

然后考虑到友链卡片部分。和 MDUI 的网格列表（类似 WordPress 版 MDx 主题那样）不一样，Bulma 并没有比较合适的友链卡片方案，所以这里还是借鉴的 [@Nofated](https://blog.nofated.win) 的友链卡片样式，然后稍作了一点修改：将友链头像的尺寸改为 96x96。头像增大的同时 slogan 的位置也大大增加，电脑版的大小能够容纳三行可写较多文字的 Slogan，但手机版不太行，会直接往下顶。

大小确定后，我就修改了一下能容纳内容的布局大小，由原来的 `is-half` 改为了 `is-four-fifths`，让页面一行两个卡片时卡片能够更大，看起来其实也舒服很多。手机版页面并不会跟随这个而变化。

## 接入卡片

卡片在调整布局的时候就已经写好了，然后直接贴代码进去测试就行。

标准的友链卡片内容如下：

``` html
<div class="card">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-96x96">
                    <img src="头像链接" class="is-rounded">
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">朋友名称</p>
                <p class="subtitle is-6">他的 Slogan</p>
            </div>
        </div>
    </div>
    <footer class="card-footer">
        <a target="_blank" href="站点链接" class="card-footer-item">站点标题</a>
    </footer>
</div>
```

要做到平均间隔和居中垂直分离的话，需要顺序定义 `columns is-multiline` 和 `column is-half`，并且后者在每一个卡片代码都必须得定义。也就是说，除了 `columns is-multiline` 只需要在开头写一次之外，`column is-half` 需要加到上述友链卡片的第一行，代码如下：

``` html
<div class="column is-half">
  <div class="card">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-96x96">
                    <img src="头像链接" class="is-rounded">
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">朋友名称</p>
                <p class="subtitle is-6">他的 Slogan</p>
            </div>
        </div>
    </div>
    <footer class="card-footer">
        <a target="_blank" href="站点链接" class="card-footer-item">站点标题</a>
    </footer>
  </div>
</div>
```

然后依此顺序叠加即可，CSS 会帮你自动排序。

## 载入头像

### 使用原来的头像链接

当时在导入友链的时候，为了方便，我直接写入了原本友链列表使用的各站头像链接。导入完之后，在裸连情况下测试，一下子让我震惊。少部分使用国内服务存储头像或者用 CDN 加载的头像还好，但是一些从自站出来或是用 GitHub Raw 反代的，速度简直是无法比喻。说明白一点就是，有些加载了三下才加载完成，有些半天都没加载完成。**烦**

### 尝试从自己图床加载

上面有说到：Pages 和 Images 最终并成了 Library，并且 Links 也加入其中。所以我尝试将部分这种情况的头像放入我的图床，然后推上去进行测试。结果便是：没啥用处，该慢还是得慢，尽管这个图床走的是 Vercel 的 CDN。

### 使用公共图床？

<SM.MS> 直接 pass，速度其实也不太行；我还有一个朋友开的图床的账号，但是他的图床 CDN 对国内也不是很友好，所以也 pass。

有人建议我上付费图床，但是不是我卖惨，我自己的零花钱并不是非常的富裕，很多时候几近为 0，所以付费图床也 pass 掉。

### 使用反代

有过开发者写了 Cloudflare Workers 反代 GitHub 资源的脚本代码，并且可用，所以我是打算用这个方法。

摸索了一波，我就临时开了一个 GitHub Avatars 和一个 GitHub Raw Files 的反代。测试的时候我的方案是从 GitHub 仓库读取的头像直接走 GitHub Raw 反代，如果没有就走 GitHub Avatars 反代。测试的结果是：从 GitHub Raw 反代出来的头像，因为各种奇怪的因素，没有从 GitHub Avatars 反代出来的头像快。这么一想，还不如直接走 GitHub Avatars，干脆就把 Raw 的反代给掐掉了。

## 压缩站点图标

> 其实是压缩了所有站在用的图片（）

用上 GitHub Avatars 反代后，再经过一点点调教之后，除了初次加载可能速度不太行之外，基本整个页面的友链头像没有 Lazyload 下加载也算还能接受。但是，在观察 Console Network 部分时，页面的加载速度还是很慢，一细看，我超，居然是我的 Favicon 在拖速度？？

然后这么一想，我的 Favicon 应该有 100+ KB，加载这么久也就是说 100+ KB 还是一个算是很大的体积。考虑到加载速度和文件体积，我尝试寻找一个支持透明背景的文件格式，当然也好找——它就是 .WebP 格式。不仅支持透明背景，并且比 .PNG 格式体积小了很多。

（然后就是无聊的图片库内图片转格式，顺便修图片路径）

终于，在各种调教下，除开因 Bulma CSS 的大体积造成的速度影响，友链页面这个部分在缓存过后加载差不多 2s 左右，也算是很好的一个速度了，Google PageSpeed Insights 电脑端速度满分，手机端 90+ 分。