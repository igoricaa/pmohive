import { getHomePageData, getLatestPosts } from '@/sanity/lib/queries';

export default async function Home() {
  const [homePageResult, latestPostsResult] = await Promise.all([
    getHomePageData(),
    getLatestPosts(12),
  ]);

  const { homePage: homePageData } = homePageResult;

  return <main>Hello World</main>;
}
