---
title: KernelSU 个人使用体验
date: 2023-07-27 23:29:18
---

偶然从 Magisk 升级到了 KernelSU。

<!--more-->

## 导入

因为种种原因，我从 BlissROM 切出，转入了 AlphaDroid。这次刷入的 AlphaDroid 预置了维护者自己开发的 Alza Kernel。

这个内核因为基于 Paradox Kernel (Developed by pzqqt)，所以 Paradox 有的特性它也有，并且修复了在类原生系统上使用 ANX Camera 无法录制视频的问题。但今天的重点不是上述的东西，今天的重点是：它支持的 KernelSU。

## What is KernelSU

KernelSU 是一个工作在内核的 Root 解决方案，而广为知晓的 Magisk 甚至 SuperSU 都工作在用户空间。

> KernelSU 的主要特点是它是基于内核的。 KernelSU 运行在内核空间， 所以它可以提供我们以前从未有过的内核接口。 例如，我们可以在内核模式下为任何进程添加硬件断点；我们可以在任何进程的物理内存中访问，而无人知晓；我们可以在内核空间拦截任何系统调用; 等等。
> *Source from [KernelSU](https://kernelsu.org/zh_CN/guide/what-is-kernelsu.html)*

## 如何用上 KernelSU?

因为 KernelSU 在内核工作，所以你的手机必须要解锁 BootLoader，不然你也改不了内核。

其次，你需要一个支持你的手机的、含有 KernelSU 的内核。如果没有现成的内核可用，你需要手动构建一个，但是构建含有 KernelSU 的内核对构建者的要求较高，你需要掌握比较多的相关知识。

> 若你只是在用户空间使用 Root 权限，Magisk 足矣，不一定必须上 KernelSU。

## 个人体验区别

### Root 权限授权

在过去使用 Magisk 的历路中，因为其运行在用户空间，所以用户空间内的任何应用都可以执行 `su`；但在实际使用时，Magisk 收到来自应用的 `su` 执行请求后会询问你是否将 Root 权限给予这个应用。

但是，对于一些安全性要求严格的应用来说，`su` 能够执行仍然是一个具有风险的事情，若将 Magisk 的 Root 授权请求交由一个对这一块不熟悉的人来决定，很大概率下他会直接放行，一些不好的应用也很大概率会趁此拿到 Root 权限干坏事。故此，这些安全性要求严格的应用会检测 `su` 是否可执行（原理上应该是这样？），若 `su` 可执行就拒绝用户使用它们。

但换到 KernelSU 这边，因为其运行在内核空间，个人认为它能够严格控制应用使用甚至检测 `su` 的权力，并将 `su` 的使用权完全交由用户。打个比方，你不授予某个应用使用 `su` 的权力，那么它不单单是无法使用 Root 权限，甚至它都不知道 `su` 能够使用。并且，KernelSU 支持 App Profile，用户可设定这个应用能够用 Root 权限做什么，实现权限最小化。

### 模块

KernelSU 在安装 Zygisk on KernelSU 后，可兼容大多数需要 Zygisk 的模块，例如 LSPosed 和 Shamiko。目前体验下来没有遇到什么 Bug。

> 值得一提的是，KernelSU 安装 Shamiko 后，Shamiko 会对已授权 Root 权限的应用生效。

## 没啥好讲的小结

KernelSU 在不断的迭代之后，确实做的更完善了，给我的体验也很好.mp4