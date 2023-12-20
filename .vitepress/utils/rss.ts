import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = "https://blog.restent.win";

export async function createRssFile(config: SiteConfig) {
  const feed = new Feed({
    title: "Restent's Notebook",
    description:
      "Blog of Restent Ou (gxres042), lost in the nothingness and silence.",
    id: hostname,
    link: hostname,
    language: "zh-CH",
    image: "https://library.restent.win/images/icons/favicon.webp",
    favicon: `https://library.restent.win/images/icons/favicon.webp`,
    copyright: "Copyright © Restent Ou 2019 - present. Built with VitePress by SliverRiver.",
  });

  const posts = await createContentLoader("posts/*.md", {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(+getDate(b.url) - +getDate(a.url)));

  for (const { url, excerpt, html } of posts) {
    const lastStr = url.split("/").pop();
    const title = lastStr?.substring(2, lastStr.length - 5) || "";
    feed.addItem({
      title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: "Restent Ou",
          email: "i@restent.win",
          link: "https://www.restent.win",
        },
      ],
      date: getDate(url),
    });
  }

  writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

export function getDate(url: string) {
  return new Date(url.substring(4, 14));
}
