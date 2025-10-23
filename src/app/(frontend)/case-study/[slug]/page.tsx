import ScrollMeter from '@/components/scroll-meter';
import { urlForUncropped } from '@/sanity/lib/image';
import {
  getAllCaseStudiesWithSlugs,
  getCaseStudyData,
  getLatestPosts,
} from '@/sanity/lib/queries';
import { Image } from 'next-sanity/image';
import { notFound } from 'next/navigation';
import { Slug } from 'sanity';
import Heading from '@/components/ui/heading';
import HeadingBlock from '@/components/case-study/heading-block';
import HeadingTextBlock from '@/components/case-study/heading-text-block';
import TextareaBlock from '@/components/case-study/textarea-block';
import ImageBlock from '@/components/case-study/image-block';
import TextGridBlock from '@/components/case-study/text-grid-block';
import SpacerBlock from '@/components/case-study/spacer-block';
import DividerBlock from '@/components/case-study/divider-block';
import BlogSection from '@/components/sections/home/blog-section';
import { PortableTextBlock } from 'next-sanity';

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudiesWithSlugs();

  return caseStudies.map((caseStudy: { slug: Slug }) => ({
    slug: caseStudy.slug.current,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ caseStudy: data }, latestPostsResult] = await Promise.all([
    getCaseStudyData(slug),
    getLatestPosts(12),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <main className='pb-10 sm:pb-16 xl:pb-35 pt-28 sm:pt-34 lg:pt-40'>
      <ScrollMeter />

      <section className='relative px-side'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/65'></div>
        <Image
          src={urlForUncropped(data.mainInfo.featuredImage).url()}
          alt={data.mainInfo.title}
          width={1375}
          height={388}
          quality={85}
          preload={true}
          className='w-full h-auto object-cover aspect-[343/161] sm:aspect-[786/222] xl:aspect-[1375/388]'
        />
      </section>

      <section className='px-side xl:grid xl:grid-cols-12 xl:gap-x-5 -mt-8 sm:-mt-21 xl:-mt-24 2xl:-mt-28 z-2 relative'>
        <Heading level='h1' className='xl:col-span-10 xl:col-start-2'>
          {data.mainInfo.title}
        </Heading>

        <div className='border-b border-white/30 pb-6 xl:pb-8 mt-4 sm:mt-6 xl:mt-8 xl:col-span-10 xl:col-start-2'>
          <p className='font-mono font-sm sm:font-base'>
            <span className='highlight font-bold sm:font-lg'>Client:</span>{' '}
            {data.mainInfo.client}
          </p>
          <p className='font-mono font-sm sm:font-base mt-2'>
            <span className='highlight font-bold sm:font-lg'>Project:</span>{' '}
            {data.mainInfo.projectDescription}
          </p>
        </div>
      </section>

      <section className='px-side xl:grid xl:grid-cols-12 xl:gap-x-5 mt-10'>
        <div className='xl:col-span-10 xl:col-start-2'>
          {data.content?.map((block, index) => {
            switch (block._type) {
              case 'headingBlock':
                return <HeadingBlock key={index} heading={block.heading} />;

              case 'headingTextBlock':
                return (
                  <HeadingTextBlock
                    key={index}
                    heading={block.heading}
                    content={block.content}
                  />
                );

              case 'textareaBlock':
                return <TextareaBlock key={index} content={block.content} />;

              case 'imageBlock':
                return (
                  <ImageBlock
                    key={index}
                    _type={block._type}
                    image={block.image}
                    subtitle={block.subtitle}
                    aspectRatio={block.aspectRatio}
                  />
                );

              case 'textGridBlock':
                return (
                  <TextGridBlock
                    key={index}
                    heading={block.heading}
                    content={block.content}
                    items={block.items}
                  />
                );

              case 'spacerBlock':
                return <SpacerBlock key={index} height={block.height} />;

              case 'dividerBlock':
                return <DividerBlock key={index} height={block.height} />;

              default:
                console.warn('Unknown block type:');
                return null;
            }
          })}
        </div>
      </section>

      <BlogSection
        subtitle={data.blog.subtitle}
        heading={data.blog.heading}
        description={data.blog.description as PortableTextBlock[]}
        ctaButton={data.blog.button}
        posts={latestPostsResult}
      />
    </main>
  );
}
