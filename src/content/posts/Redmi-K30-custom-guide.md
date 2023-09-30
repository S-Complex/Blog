---
title: Redmi K30 刷机迫真指南
date: 2023-08-07
description: 那些年我刷机的小经验的小总结
---

## 导入

按三年维护期来看，Redmi K30 成功的在维护期结束前一个月把 MIUI 更新到了 13.0.6。但是，这个 MIUI 13.0.6 也不是什么 ~~善茬~~，比如有次来了条信息，没碰到手机的情况下他自己解锁进入桌面了，有点逆天。

虽然继续留在 MIUI 也不是没有好处，比如手机丢了可以远程锁定，盗窃者重置了也会上 ID 锁。但想想，K30 作为我现在的主力，丢了那真的就逆天了，那还是乖乖上类原生 + 模块之类的吧。

## 初衷

大概是看了一下酷安，大家对此时 K30 的一些资源和一些问题不是很熟悉，所以把之前的 KernelSU 个人体验给删了（毕竟写的也不好），重置成了这一篇更逆天一点的迫真指南。

::: tip 别慌

这篇可以算是水文。对于新手来说看起来挺难，但越往后推其实步骤都差不多。

:::

---

## 了解一下：解锁 BootLoader

小米的机型如何解锁 BootLoader 大家总应该都是知道的。~~但我就是很想提一提~~

如果机子第一次绑定你的小米账号，那躲不过 168h 的等待时间（联发科 + 漏洞除外），之后解锁理论上是没有时间限制的。但是请谨记，一个月只能解锁一台小米设备，解锁机子超过 3 次可能触发 720h 的等待时间（也就是一个月），解锁 4 台 **不同的设备** 那今年就别想着解锁了。

所以，如果没什么需要，不要学我，一用回 MIUI 就要把 BL 上了。估计之后我也不会上 BL 了。

## 刷入第三方 Recovery

目前支持 Android 13 分区解密的有 TWRP 和 PBRP，OrangeFox 目前处于无人维护状态（说简单点就是停更），并且近期也没有什么人做非官方的 Recovery。

TWRP 就是一个简简单单的 `.img` 文件，解锁完 Fastboot 之后用 Platform Tools 一刷就完事了：

``` shell
$ fastboot flash recovery recovery.img
```

而 PBRP 给的是一个压缩包。先从压缩包内的 TWRP 文件夹提取出 `recovery.img` 文件，按上面方式一刷，进入到 Recovery 之后通过 ADB Sideload 或者卡刷这个压缩包即可解锁完 PBRP 全部功能。

## 选择并刷入想要的系统

### 如何去选择

能选的比较多，这里列出一个简表：

- 官方包：
    - Xtended + AlphaDroid + Evolution X (由 @jaymistry258 维护)
    - BlissROM (由 @babu_frik 维护)
    - riceDroid (已停更，之前由 @Sharmagrit 维护)
- 非官方包：
    - crDroid (Android 13 版由 @abzgif 构建；Android 12.1 版已停更，由 @pzqqt 构建 + 维护)
    - Pixel Experience (近期两个包分别由 @SimpleJony 和 @jaymistry258 构建)
    - Project-Blaze (由 @jaymistry258 构建)
    - ArrowOS 13.1 (由 @babu_frik 构建)
    - 往前还有比较多，构建者: @jaymistry258 @San_4255 @BigChadCat 等

::: tip

根据昨日 @jaymistry258 的个人群信息，他正在忙碌于出国事宜，所以在一段时间内将不会活动（类似于做包）。

:::

::: warning

可能受 Android 13 QPR2 更新影响，从这个安全更新开始的类原生将无法在国行 K30 上使用 NFC 功能，具体原因我并不是很清楚。

并且，由于印度方售的 ~~K30~~ X2 是 **不包含 NFC 功能** 的，因此他们无法测试 NFC 功能是否正常。

若你有在类原生上重度使用 NFC 的需求，请慎重考虑选择 QPR2 及之后的 Android 13 类原生。具体时间可能在 **今年 4 月 24 日**，以我测试基于 Android 13 QPR2 的 BlissROM 16.6 的时间为准。

:::

### 选好了，开刷

首先，你应该 **备份好重要的数据**；然后，在 Recovery 中格式化 Data 分区。不建议双清后刷包再格式化 Data，好像有一定概率会触发 Google 账号锁，不包含 GApps 的除外。

格式化 Data 后，若你觉得传卡刷包进去太麻烦，不妨在 Recovery 里找到 Sideload，并在电脑使用 Sideload 指令将卡刷包刷进去：

``` shell
$ adb sideload {package}.zip
```

::: tip

{package} 是你的卡刷包名称。实际上使用该指令时没有中括号。

:::

刷完之后，我个人是建议先重启到系统看一看，因为......

### 彩蛋：一些系统级 Bug

之前有在酷安上提到，有些类原生是含有 Bug 存在的。

- 对于 BlissROM 和非官方 ArrowOS，自带的 AOSP 通讯录在不经修改的情况下，无法创建联系人；
- 对于已停更的 riceDroid 和 AlphaDroid，在系统内没有任何谷歌套件甚至 GMS 的时候，安装需要 GMS 权限的应用将会引发系统崩溃，然后就是软重启。

对于 AOSP 通讯录无法创建联系人，其实我觉得应该也没多少人会不带个谷歌套件的。但如果你真的像我一样不需要 GMS / Play 服务 的话，在 NikGApps 找一个谷歌通讯录的附加组件（Addons）即可，反正这玩意也不用强制登录 Google 账号。

而对于系统崩溃和软重启，如果你真的不需要 GMS / Play 服务那还是别用 AlphaDroid 了。这个问题其实在我年初用 riceDroid 10.1 的时候就有遇到过，解决办法就是刷个 NikGApps Core，再在设置中用上他们那个新增的 *谷歌服务控制开关* 即可，也就是关上。而 AlphaDroid 没这个玩意，其实已经算是没辙了，，，，

## 选择和刷入内核

### 选

目前可以选择的、有在更新的内核是 Alza Kernel 和 Paradox Kernel。

若是有关注 pzqqt 的 Telegram 新闻频道，你或许也知道他的 K30 寄了，所以 Paradox 现在着重于 Linux 和 CAF 双上游的更新，直到 Linux 4.14 生命周期结束。

而 Redcliff Kernel 的新版本理论上预装在 BlissROM 里，目前可刷的停留在去年的 3.2.0。

### KernelSU Support

截至这篇文章发布，Alza Kernel 和 Paradox Kernel 都支持 KernelSU，后者是额外提供了一个基于 KernelSU 编译的内核包。

### 刷

内核其实跟系统卡刷包一个刷法，在 Recovery 下通过 Sideload 刷入：

``` shell
$ adb sideload {kernel_package}.zip
```

或者你已经在手机上下载有，重启并且本地刷入即可。

::: warning

因为不确定会发生什么，所以我建议在启动系统到桌面之后再重启到 Recovery，并刷入内核包。

:::

## Root 方案

- 假设你现在正在使用含有 KernelSU 的内核。KernelSU 在刷入了 [Zygisk on KernelSU](https://github.com/Dr-TSNG/ZygiskOnKernelSU) 后，理论上能支持大部分你在 Magisk 上使用的模块。至于为何需要此模块，是因为 KernelSU 本体 **并不支持** Zygisk。
- 假设你现在正在使用未含有 KernelSU 的内核。你可以像往常一样使用 Magisk 来获取 `su` 权限和使用模块。
- 假设你现在正在使用含有 KernelSU 的内核，但你又想同时使用 Magisk。请注意，根据 KernelSU 文档内容，KernelSU 模块系统会和 Magisk 的 magic mount 冲突，如果你在 KernelSU 使用模块，那么这个 Magisk 基本全废，像是跟没刷也没有区别。
    - 但是，如果你只是通过 KernelSU 获取 `su` 权限，但并不安装和使用模块，KernelSU 和 Magisk 可以一起工作。

我自己使用的是第一种方案，已经能够满足我的 `su` 权限和模块使用要求了，并且不用额外使用 Shamiko 隐藏 Root。

## 我在使用的模块

### Thanox

Thanox 是一个较全能的后台和权限管理应用，完整版用了 10 多块钱就能永久解锁。

我的用法是：设定后台远程清理、应用回到后台自动休眠或停止进程（可设置例外）、较全面的权限管理等，一些像应用锁（打开启用该功能的应用会被 Thanox 拦截，并且需要安全验证）和应用双开（基于 Android 工作资料）也是值得推荐的。

### MiPush Framework

这个应该资深刷机玩家都听说过，和 HMS Push 一样，实现系统级推送。

~~这下再也不怕没后台就接收不到信息啦~~（其实微信到现在都不支持任何系统级推送通道

## 另提：我的实机耗电量

虽然 Alza Kernel 并不是完全基于 pzqqt 的 Paradox Kernel，但是在待机下的耗电量基本可以说一条直线，恐怖如斯。

---

## 本文内容来源

- [Telegram @pocox2officialupdates](https://t.me/pocox2officialupdates)
- [KernelSU](https://kernelsu.org)