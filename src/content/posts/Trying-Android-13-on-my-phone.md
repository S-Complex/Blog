---
title: 在我的手机尝试 Android 13
date: 2022-10-27
description: 尝试运行 Android 13、Magisk 模块的选择，和应用程序的兼容性。
---

前阵子把 MarkW 给了我奶奶（当老人机用），我手边也没什么手机可以当备用机用了，干脆回归老本，把两台手机的任务合并成一个手机用。而因为要用到 Google Play 服务，对我有两种选择：

- 使用 MIUI CN 或者 EU，均可以使用 Google Play 服务；
- 刷入第三方类原生 ROM，原生自带 Google 套件。

MIUI 对于每个型号都提供两个大版本更新。而 Phoenix 发布的时候是基于 Android 10 的 MIUI 11，到现在能够升级到基于 Android 12 的 MIUI 13，正好够了两个大版本更新，可能以后不会再有相应更新。虽然用旧版本问题也不是很大，但我就是这么个强迫症，很喜欢跟随 Android 新版本体验新特性。再加上 *我是原生党* 这个附加条件，再加上现在类原生有 Android 13，我还是选择了刷入第三方类原生系统。**当然，肯定少不了 ROOT 和模块。**

## 刷入 Android 13

刷机第一步是刷入 Third-party Recovery，我选择的是 TWRP 3.7.0。

虽然 TWRP 3.7 并没有对 Android 13 提供适配（也就是无法解密 Data 分区），但相比使用类似 Pixel Experience, LineageOS 和 Evolution X 提供的远古 Recovery，TWRP 还是强一些的。 ~~反正都是用 ADB 刷包，那我还不如用 TWRP~~

然后就是系统。目前只有 Evolution X 提供了 Android 13 的包，Pixel Experience、ArrowOS 仍处于 Android 12.1，其它没仔细看。刷入时先 WIPE 一次 cache 和 Data，然后通过 ADB Sideload 刷入系统包，最后执行一次 Format Data 即可。（其实就和平常刷机差不多）

Android 13 设置向导保留了 *在离线状态下设置*，可以不用登录 Google 账号。

## 刷入 Magisk 和模块

[在这里](https://github.com/topjohnwu/magisk/releases) 下载 Magisk 的 APK 文件。重启至 TWRP，使用 ADB Sideload 刷入 APK。**是的你没听错，Magisk 的 APK 也是可以刷的，但过 ZIP 校验会失败，所以不要打开 ZIP 校验。**重启，安装 Magisk APP（也就是上述刷入的那个 apk）。

接下来可以考虑模块了。目前较多的模块分别有 Riru 和 Zygisk 版本，而 Zygisk 可以让 Magisk 在 Zygote 中运行，而不用多刷一个模块注入 Zygote。因此我很推荐使用 Zygisk 和 Zygisk 版本的模块。

我选择的模块和附属软件如下：

- Zygisk - Sui（和 Shizuku 同理）
    - App Ops（权限管理）
- Shamiko（隐藏 root）
- LSPosed
    - Hide My Applist（隐藏应用列表）
    - TSBattery（控制腾讯软件后台）

上述软件可以实现在 MIUI 上能够控制的权限，防止一些流氓软件乱提权orz

> P.S. 隐藏应用列表的正式版仍然停留在 2.3.2，Android 13 必须使用最新的 Beta 版本。

## 应用兼容性

目前我在我的手机上分别安装了 20+ 个国产软件和 20+ 个国际软件。

经过几天的使用，它们与 Android 13 的兼容性很高，并没有出现闪退之类的现象。