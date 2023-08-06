import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Posts",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
  ],
});
