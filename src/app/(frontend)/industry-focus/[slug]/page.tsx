import Heading from '@/components/ui/heading';
import { urlForUncropped } from '@/sanity/lib/image';
import { getAllServicesWithSlugs, getServiceData } from '@/sanity/lib/queries';
import { Image } from 'next-sanity/image';
import { SERVICE_QUERYResult } from '../../../../../sanity.types';
import { notFound } from 'next/navigation';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import SplitSection from '@/components/sections/split-section';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Subtitle from '@/components/ui/subtitle';
import { TextGradientScroll } from '@/components/text-gradient-scroll';
import { cn } from '@/lib/utils';
import BreakSection from '@/components/sections/break-section';

export async function generateStaticParams() {
  const services = await getAllServicesWithSlugs();
  return services.map((service: { slug: { current: string } }) => ({
    slug: service.slug.current,
  }));
}

export default async function IndustryFocusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { currentService }: SERVICE_QUERYResult = await getServiceData(slug);

  if (!currentService) {
    notFound();
  }

  return (
    <main className='pt-28 sm:pt-34 lg:pt-40 pb-15 sm:pb-0'>
      <div className='relative px-side'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/65'></div>
        <Image
          src={urlForUncropped(currentService.header.featuredImage).url()}
          alt={currentService.title}
          width={1375}
          height={388}
          quality={100}
          priority
          className='w-full h-auto object-cover aspect-[343/161] sm:aspect-[786/222] xl:aspect-[1375/388]'
        />
      </div>

      <div className='-mt-8 sm:-mt-21 xl:-mt-24 2xl:-mt-28 z-2 relative'>
        <section className='px-side xl:grid xl:grid-cols-12 xl:gap-x-5'>
          <Heading
            level='h1'
            subtitle={currentService.header.subtitle || null}
            spacing='mt-4 sm:mt-1 xl:mt-2'
            className='xl:col-span-8 xl:col-start-2'
          >
            {currentService.header.heading}
          </Heading>
          <div className='mt-3 sm:mt-6 xl:mt-8 xl:col-span-10 xl:col-start-2'>
            <PortableText
              value={currentService.header.description as PortableTextBlock[]}
            />
          </div>
        </section>
      </div>

      <SplitSection
        subtitle={currentService.challenge.subtitle}
        heading={currentService.challenge.heading}
        description={
          currentService.challenge.description as PortableTextBlock[]
        }
        backgroundImage={
          currentService.challenge.image as SanityImageSource & { alt: string }
        }
        descriptionClassName='text-sm! xl:text-base! font-normal! leading-normal'
        className='mt-10 sm:mt-12 xl:mt-16'
      />

      <section className='px-side flex flex-col sm:items-center justify-center gap-2 xl:gap-4 xl:max-w-10/12 mx-auto py-20 xl:py-30'>
        <Subtitle
          highlightedText={currentService.role.subtitle.highlightedText}
          className='sm:text-center'
        >
          {currentService.role.subtitle.text}
        </Subtitle>
        <TextGradientScroll
          text={currentService.role.description}
          highlightFirstWord={true}
          className='text-2xl sm:text-3xl xl:text-4xl xl:font-medium leading-none xl:leading-[110%] justify-start sm:justify-center'
          offset={['-0.9 center', '0.6 center']}
        />
      </section>

      <section className='px-side xl:grid xl:grid-cols-12 xl:gap-x-5'>
        <Heading
          level='h2'
          subtitle={currentService.approach.subtitle}
          className='xl:col-span-10 xl:col-start-2'
        >
          {currentService.approach.heading}
        </Heading>

        <div className='grid grid-cols-2 sm:grid-cols-8 xl:grid-cols-10 gap-4 xl:gap-5 xl:col-span-10 xl:col-start-2'>
          {currentService.approach.steps.map((step, index) => (
            <div
              key={step._key}
              className={cn(
                'mt-6 xl:mt-9 col-span-1 sm:col-span-2',
                index === 2 && 'sm:max-xl:col-start-3'
              )}
            >
              <span className='text-primary font-bold text-[42px]'>
                0{index + 1}
              </span>
              <p className='sm:text-lg font-bold mt-2 xl:mt-3'>{step.step}</p>
            </div>
          ))}
        </div>

        <TextGradientScroll
          text={currentService.highlightedText}
          className='text-2xl sm:text-3xl xl:text-4xl xl:font-medium leading-none xl:leading-[110%] justify-start sm:justify-center xl:col-span-10 xl:col-start-2 py-24 xl:pt-32 xl:pb-32 '
          offset={['-0.7 center', '0.6 0.6']}
        />
      </section>

      <SplitSection
        subtitle={currentService.infoSection.subtitle}
        heading={currentService.infoSection.heading}
        description={
          currentService.infoSection.description as PortableTextBlock[]
        }
        backgroundImage={currentService.infoSection.image}
        descriptionClassName='text-sm! xl:text-base! font-normal! leading-normal'
        className='xl:col-span-10 xl:col-start-2'
      />

      <section className='px-side flex flex-col sm:items-center justify-center gap-2 xl:gap-4 xl:max-w-10/12 mx-auto py-20 xl:py-32 xl:col-span-10 xl:col-start-2'>
        <Subtitle
          highlightedText={currentService.proofPoint.subtitle.highlightedText}
          className='sm:text-center'
        >
          {currentService.proofPoint.subtitle.text}
        </Subtitle>
        {currentService.proofPoint.description.map((item) => (
          <TextGradientScroll
            key={item._key}
            text={item.description}
            className='text-2xl sm:text-3xl xl:text-4xl xl:font-medium leading-none xl:leading-[110%] justify-start sm:justify-center'
            offset={['-0.9 center', '0.6 center']}
          />
        ))}
      </section>

      <BreakSection
        subtitle={currentService.ctaSection.subtitle}
        heading={currentService.ctaSection.heading}
        description={
          currentService.ctaSection.description as PortableTextBlock[]
        }
        backgroundImage={currentService.ctaSection.backgroundImage}
        buttons={currentService.ctaSection.buttons}
        className='xl:col-span-full'
      />
    </main>
  );
}
