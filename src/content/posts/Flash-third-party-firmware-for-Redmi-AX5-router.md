---
title: Redmi AX5 刷写第三方 OpenWRT 固件
date: 2023-11-27
description: 让 Wi-Fi 功能残废的 Redmi AX5 以有线路由的方式继续运作。
---

## 前情提要

两三个月前，在给一楼的 Redmi AX5 安装一个贴壁的路由器托架时，一个不小心把它的一条天线摔断了（貌似还有一条是里面的线材断了...）。并且那个时候我没把这个事情放心上，好啦，我爷爷奶奶成功在接下来的两三个月没法正常上网看电视，直到近几天我拔掉了一楼那个路由器。

目前二手的 Redmi AX5 的价格也不是很贵（100r 上下），所以在家人的资助下，我重新购置了一台回来替补。回来看换下来的这台 Redmi AX5，虽然 Wi-Fi 功能废的差不多了，但其它方面没有什么太大的问题，白白浪费实在有点可惜。正好之前就想玩一玩 OpenWRT，所以我计划给这一台 Redmi AX5 刷第三方 OpenWRT 固件，并顺带给家里的 Wi-Fi 设备改一下逻辑。

> 注意：这个第三方 OpenWRT 固件 **不带 Wi-Fi 功能**。要带 Wi-Fi 的话，我建议改个大内存（

## 刷入固件

### 准备工作

我的建议是提前准备好需要的东西。

- Redmi AX5 官方固件（版本号 1.0.26） | [在此寻找](https://www.right.com.cn/forum/thread-8265946-1-1.html)
- Uboot 和 MIBIB 刷写件，这里我用的是来自 coolsnowwolf | [付费，在此购买并下载](https://mbd.pub/o/bread/mbd-Ypqbk5dr)
- 第三方 OpenWRT 固件（有过渡件和最终件，本文中两者都需要） | [在此寻找](https://www.right.com.cn/forum/thread-8268411-1-1.html)
- 能插网线的电脑一台

> Uboot 和 MIBIB 刷写件肯定是要付费的。如果仅 5 元的售价也要白嫖，我的建议是别刷了，，，

> 我正在使用 breeze303 维护的 OpenWRT 固件。如果你有兴趣可以来 [这里](https://github.com/breeze303/Redmi-AX5/releases) 下载并使用。

### 开启 SSH

要想刷固件，得先拿到 SSH 的权限；要想拿到 SSH 的权限，那就得给路由器降个级啦。

登入到路由器后台，顺着 *常用设置 -> 系统状态*，你会找到路由器系统升级的地方。这时下载好上面提到的旧版固件、选择手动升级、喂进去这个固件并选择确认即可。

路由器在识别到旧版固件时，会询问你降级时是否保留数据。毕竟你都要刷第三方 OpenWRT 固件了，肯定得把「保留」的勾选给去掉并继续啦。确认之后，路由器将进行降级，等到黄灯删完并转为蓝灯之后，访问 `192.168.31.1` 并过一下设置向导，就可以进行下一步了。

> 因为小米路由网线互接后会自动 Mesh 配对，所以接下来我真的是没插网线进行的。

登入路由器后台后，观察一下它的 URL 地址，你会发现长这样：

`http://192.168.2.117/cgi-bin/luci/;stok=8f220123c7696c3e1d99fe3851fa6511/web/home#router`

是的，`/web` 前面那一段便是待会拿到 SSH 权限的重要部分。保留前面那一段，添加下述内容并执行：

`/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=-h%3B%20nvram%20set%20ssh_en%3D1%3B%20nvram%20commit%3B%20sed%20-i%20's%2Fchannel%3D.*%2Fchannel%3D%5C%22debug%5C%22%2Fg'%20%2Fetc%2Finit.d%2Fdropbear%3B%20%2Fetc%2Finit.d%2Fdropbear%20start%3B`

执行完成后若提示 { code: 0 }，那么便是成功了。这时我们把上面这一段删掉，再添加下述内容：

`/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=-h%3B%20echo%20-e%20'admin%5Cnadmin'%20%7C%20passwd%20root%3B`

若也提示 { code: 0 }，那么你就可以打开终端并 `ssh root@{路由器 IP}` 了，密码便是第二段代码执行后设定的 *admin*。

> 路由器 IP 的括号在实际填写是不需要的，下面提到的同样如此。

不出意外，你应该看到 *Welcome to XiaoQiang* 以及大大的 **ARE U OK** 啦。

### 刷写 Uboot 刷写件

拿到 SSH 权限后，首先要来刷写 coolsnowwolf 的 Uboot 刷写件。

这里我是 Windows 环境，在终端内执行 `scp {uboot 路径} root@{路由器 IP}:/tmp` 以将 Uboot 刷写件上传到路由器。

上传后，执行 `cat /proc/mtd` 查看分区表。一般来说，Uboot 分区是 mtd7，下面会提到的 MIBIB 分区则是 mtd1。

确认后，执行下述命令刷写 Uboot：

``` shell
mtd write /tmp/AX5_UBoot.bin /dev/mtd7
```

不出意外，你应该会看到如下日志输出：

``` shell
Unlocking /dev/mtd7 ...

Writing from AX5_UBoot.bin to /dev/mtd7 ...
```

在我这边它跳的十分快、有一点出乎我的意料，所以我大约等待了 10 秒才进行下一步。

### 刷写 OpenWRT 过渡件

在你购买并下载 Uboot 与 MIBIB 刷写件时，你会发现 coolsnowwolf 给的教程是 Uboot 和 MIBIB 刷写件一起刷入。但他那边是先刷写了 OpenWRT Factory 固件（ubi 格式）到 mtd13、再刷写 Uboot 和 MIBIB 刷写件，但我这边并不是这么做，所以 MIBIB 得放到下一步。

将路由器断电，用一根牙签顶住 RESET 键后插电。路由器亮黄灯后会闪烁五下，在闪烁第五下时撤走牙签，路由器会转为蓝灯。将路由器其中之一的 LAN 口与电脑连接，前往网络设定并将 IP 模式设为手动、配置如下内容：

- IP 地址：192.168.1.4
- 子网掩码：255.255.255.0
- IP 网关：192.168.1.1
- DNS 服务器：随意

提交后，尝试在浏览器访问 `192.168.1.1`，你应该能看见 Uboot 的页面。这时点击「上传文件」并选中下载好的 OpenWRT 过渡件，最后点一下右边的 **UPDATE** 就好啦。路由器这时会黄灯闪烁，闪完过一会变回蓝灯，就可以访问 `192.168.1.1` 进入 OpenWRT 管理页了。

### 刷写 MIBIB

这里和 Uboot 一个套路，用 `scp {MIBIB 路径} root@{路由器 IP}:/tmp` 将 MIBIB 刷写件上传到路由器，接下来执行下述命令刷写 MIBIB 刷写件：

``` shell
mtd write /tmp/AX5_MIBIB.bin /dev/mtd1
```

不出意外，你能看到和刷写 Uboot 刷写件差不多的日志输出：

``` shell
Unlocking /dev/mtd7 ...

Writing from AX5_UBoot.bin to /dev/mtd7 ...
```

这个我等了大约 20 秒。

### 刷写 OpenWRT 最终件

等完之后，前往 OpenWRT 管理页，顺着 *系统 -> 备份与升级*（应该是，有点忘了），在升级一栏选择「上传文件」，并选中 OpenWRT 的最终件，最后保留数据升级即可。跑完之后，不出意外的话你可以看到 ArgonTheme 的 OpenWRT 页面。Congratulations!
