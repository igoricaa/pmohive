import PostCard from '@/components/blog/post-card';
import ShareArticle from '@/components/blog/share-article';
import PostPortableText from '@/components/post-portable-text';
import Heading from '@/components/ui/heading';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForUncropped } from '@/sanity/lib/image';
import { POST_QUERY } from '@/sanity/lib/queries';
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { currentPost, relatedPosts }: POST_QUERYResult = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: ['post', `post-${slug}`],
  });

  if (!currentPost) {
    notFound();
  }

  return (
    <main className='pt-6 pb-10 sm:pb-16 xl:pb-35 sm:pt-8 xl:pt-4'>
      <div className='relative px-side'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/65'></div>
        <Image
          src={urlForUncropped(currentPost.featuredMedia).url()}
          alt={currentPost.title}
          width={1375}
          height={388}
          quality={100}
          priority
          className='w-full h-auto object-cover aspect-[343/161] sm:aspect-[786/222] xl:aspect-[1375/388]'
        />
      </div>

      <div className='-mt-8 sm:-mt-21 xl:-mt-24 2xl:-mt-28'>
        <section className='px-side xl:grid xl:grid-cols-12 xl:gap-x-5'>
          <Heading
            level='h1'
            subtitle={currentPost.subtitle || null}
            spacing='mt-4 sm:mt-1 xl:mt-2'
            className='xl:col-span-6 xl:col-start-2'
          >
            {currentPost.title}
          </Heading>

          <div className='xl:col-span-9 xl:col-start-2 mt-4 xl:mt-6'>
            <PostPortableText
              value={currentPost.content as PortableTextBlock[]}
            />
          </div>

          <ShareArticle
            title={currentPost.title}
            slug={currentPost.slug}
            className='col-span-10 col-start-2'
          />
        </section>

        <section className='mt-10 sm:mt-11 xl:mt-14 xl:grid xl:grid-cols-12 xl:gap-x-5'>
          <p className='text-[34px] sm:text-[44px] xl:text-5xl font-bold px-side xl:col-span-full xl:col-start-2'>
            Related Posts
          </p>

          <div className='hidden md:grid grid-cols-12 gap-4 xl:gap-5 mt-8 sm:mt-6 xl:mt-12 px-side xl:col-span-9 xl:col-start-2'>
            {relatedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post as unknown as Post}
                className='col-span-4'
              />
            ))}
          </div>

          <div className='md:hidden md:col-span-5 xl:col-span-9 2xl:col-span-8'>
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
  );
}
