import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/', // Block Sanity Studio from indexing
          '/api/', // Block API routes from indexing
        ],
      },
      // {
      //   userAgent: 'GPTBot', // Block OpenAI's web crawler
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'ChatGPT-User', // Block ChatGPT user agent
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'CCBot', // Block Common Crawl bot
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'anthropic-ai', // Block Anthropic's crawler
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'Claude-Web', // Block Claude web crawler
      //   disallow: ['/'],
      // },
    ],
    sitemap: 'https://www.pmohive.com/sitemap.xml',
  };
}
