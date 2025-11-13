import PostCard from '@/components/blog/post-card';
import ShareArticle from '@/components/blog/share-article';
import PostPortableText from '@/components/post-portable-text';
import Heading from '@/components/ui/heading';
import { urlForUncropped } from '@/sanity/lib/image';
import { getAllPostsWithSlugs, getPostData } from '@/sanity/lib/queries';
import { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import { notFound } from 'next/navigation';
import { Post, POST_QUERYResult } from '../../../../../sanity.types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import ScrollMeter from '@/components/scroll-meter';
import { AnimateInView } from '@/components/animate-in-view';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import ArticleSchema from '@/components/structured-data/article-schema';

export async function generateStaticParams() {
  const posts = await getAllPostsWithSlugs();

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { currentPost } = await getPostData(slug);

  if (!currentPost) {
    return {};
  }

  return generatePageMetadata({
    title: currentPost.seo?.metaTitle || currentPost.title,
    description:
      currentPost.seo?.metaDescription ||
      currentPost.excerpt ||
      currentPost.content,
    image: currentPost.seo?.ogImage as SanityImageSource,
    seo: currentPost.seo,
    type: 'article',
    publishedTime: currentPost.date,
    modifiedTime: currentPost._updatedAt,
    author: 'PMO Hive',
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { currentPost, relatedPosts }: POST_QUERYResult =
    await getPostData(slug);

  if (!currentPost) {
    notFound();
  }

  return (
    <>
      {/* Article Schema for SEO */}
      <ArticleSchema
        title={currentPost.title}
        description={currentPost.excerpt}
        publishedTime={currentPost.date}
        modifiedTime={currentPost._updatedAt}
        image={currentPost.featuredMedia}
        slug={slug}
      />

      <main className='pb-10 sm:pb-16 xl:pb-35 pt-28 sm:pt-34 lg:pt-40'>
        <ScrollMeter />
        <div className='relative px-side'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/65'></div>
          <Image
            src={urlForUncropped(currentPost.featuredMedia).url()}
            alt={currentPost.title}
            width={1375}
            height={388}
            quality={85}
            preload={true}
            className='w-full h-auto object-cover aspect-[343/161] sm:aspect-[786/335] xl:aspect-[1375/500]'
          />
        </div>

        <div className='-mt-8 sm:-mt-21 xl:-mt-24 2xl:-mt-28 z-2 relative'>
          <section className='px-side xl:grid xl:grid-cols-12 xl:gap-x-5'>
            <AnimateInView
              offset={80}
              direction='up'
              className='xl:col-span-6 xl:col-start-2'
            >
              <Heading
                level='h1'
                subtitle={currentPost.subtitle || null}
                spacing='mt-4 sm:mt-1 xl:mt-2'
              >
                {currentPost.title}
              </Heading>
            </AnimateInView>

            <AnimateInView
              offset={80}
              direction='up'
              delay={0.3}
              className='xl:col-span-9 xl:col-start-2 mt-4 xl:mt-6'
            >
              <PostPortableText
                value={currentPost.content as PortableTextBlock[]}
              />
            </AnimateInView>
            <ShareArticle
              title={currentPost.title}
              slug={currentPost.slug}
              className='col-span-10 col-start-2'
            />
          </section>

          <section className='mt-10 sm:mt-11 xl:mt-14 xl:grid xl:grid-cols-12 xl:gap-x-5'>
            <AnimateInView
              offset={80}
              direction='up'
              className='xl:col-span-full xl:col-start-2'
              inViewMargin='-150px'
            >
              <p className='text-[34px] sm:text-[44px] xl:text-5xl font-bold px-side'>
                Related Posts
              </p>
            </AnimateInView>

            <div className='hidden md:grid grid-cols-12 gap-4 xl:gap-5 mt-8 sm:mt-6 xl:mt-12 px-side xl:col-span-9 xl:col-start-2'>
              {relatedPosts.map((post, index) => (
                <AnimateInView
                  offset={80}
                  direction='up'
                  inViewMargin='-50px'
                  delay={index * 0.3}
                  className='col-span-4'
                >
                  <PostCard key={post._id} post={post as unknown as Post} />
                </AnimateInView>
              ))}
            </div>

            <div className='md:hidden md:col-span-5 xl:col-span-9 2xl:col-span-8 mt-8'>
              <Carousel
                opts={{
                  align: 'start',
                }}
                className='w-full order-1 flex flex-col md:flex-col-reverse gap-3 md:gap-2.5 xl:gap-3'
              >
                {/* Carousel Content */}
                <CarouselContent className='pl-side'>
                  {relatedPosts.map((post, index) => (
                    <CarouselItem
                      key={`${post.title}-${index}`}
                      className={cn(
                        'basis-[82%] sm:basis-[65%] pl-0 pr-4 sm:pl-0 sm:pr-side '
                      )}
                    >
                      <PostCard post={post as unknown as Post} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom positioned navigation - below carousel on mobile, above on tablet */}
                <div className='flex justify-end items-center gap-3 pr-side'>
                  <CarouselPrevious
                    variant='navigation'
                    size='navigation'
                    className='static translate-y-0 rotate-180'
                  />
                  <CarouselNext
                    variant='navigation'
                    size='navigation'
                    className='static translate-y-0 bg-primary'
                  />
                </div>
              </Carousel>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
