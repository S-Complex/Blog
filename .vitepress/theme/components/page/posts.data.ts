// posts.data.ts
import { createContentLoader } from "vitepress";

interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  description: string;
  banner: string;
  copyright: string;
  comment: boolean;
}

declare const data: Post[];
export { data };

export default createContentLoader("posts/*.md", {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: formatDate(frontmatter.date),
        description: frontmatter.description,
        banner: frontmatter.banner,
        copyright: frontmatter.copyright,
        comment: frontmatter.comment,
      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}