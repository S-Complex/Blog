import path from 'path';
import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { createContentLoader, SiteConfig } from 'vitepress';

const hostname = 'https://blog.gxres.net';

export async function createAtomFile(config: SiteConfig): Promise<void> {
  const feed = new Feed({
    title: "Restent's Notebook",
    description: 'Blog of Restent Ou (gxres042), lost in the nothingness and silence.',
    id: hostname,
    link: hostname,
    language: 'zh-CH',
    image: 'https://library.gxres.net/images/icons/favicon.webp',
    favicon: 'https://library.gxres.net/images/icons/favicon.webp',
    copyright: 'Copyright © Restent Ou 2019 - present. Built with VitePress by SliverRiver.',
  });

  const posts = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true,
  }).load();

  posts.sort((a, b) => Number(new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()));

  for (const { url, excerpt, html, frontmatter } of posts) {
    const lastStr = url.split('/').pop();
    const title = lastStr?.substring(2, lastStr.length - 5) || '';
    feed.addItem({
      title,
      id: `${hostname}${url}`,
      link: `${hostname}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: 'Restent Ou',
          email: 'i@restent.win',
          link: 'https://www.gxres.net',
        },
      ],
      date: new Date(frontmatter.date),
    });
  }

  writeFileSync(path.join(config.outDir, 'atom.xml'), feed.atom1(), 'utf-8');
}
