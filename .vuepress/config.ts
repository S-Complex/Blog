import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Sliver Notebook",
  description: "An unreachable dream.",
  head: [
    [
      'link',{ rel: 'icon', href: 'https://library.restent.win/images/icons/favicon.webp' }
    ]
  ],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "https://library.restent.win/images/icons/favicon.webp",
    author: "Restent Ou",
    authorAvatar: "https://library.restent.win/images/icons/avatar.webp",
    catalogTitle: 'TOC',
    navbar: [
      { text: "Index", link: "/" },
      { text: "Friends", link: "#" },
      { text: "Home", link: "https://www.restent.win" },
    ],
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
