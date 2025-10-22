import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { OpenPosition } from '../../../../sanity.types';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { buttonVariants } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface OpenPositionsSectionProps {
  positions: OpenPosition[];
}

export default function OpenPositionsSection({
  positions,
}: OpenPositionsSectionProps) {
  if (!positions || positions.length === 0) {
    return <NoOpenPositionsSection />;
  }

  return (
    <section className='px-side mt-9 sm:mt-13 xl:mt-18 2xl:mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5'>
        <div className='col-span-full 2xl:col-span-10 2xl:col-start-2'>
          <div className='hidden md:grid grid-cols-10 gap-4 xl:gap-5 pb-2 w-[calc(100%-3rem)]'>
            <span className='font-mono font-medium text-lg text-white col-span-3'>
              position
            </span>
            <span className='font-mono font-medium text-lg text-white col-span-3 md:col-span-4'>
              location
            </span>
            <span className='font-mono font-medium text-lg text-white col-span-3 md:col-span-2 md:col-start-9'>
              type
            </span>
          </div>

          <Accordion type='single' collapsible className='w-full'>
            {positions.map((position, index) => (
              <AccordionItem key={position._id} value={position._id}>
                <AccordionTrigger
                  className={cn(
                    'hover:no-underline py-6',
                    index === 0 ? 'md:pt-0 xl:pt-0' : ''
                  )}
                >
                  <div className='hidden md:grid md:grid-cols-10 md:gap-4 xl:gap-5 w-full'>
                    <h3 className='font-sans font-medium text-2xl xl:text-4xl text-white text-left col-span-3'>
                      {position.title}
                    </h3>
                    <span className='font-sans font-medium text-2xl xl:text-4xl text-white col-span-3 md:col-span-4'>
                      {position.location}
                    </span>
                    <span className='font-sans font-medium text-2xl xl:text-4xl text-white col-span-3 md:col-span-2 md:col-start-9'>
                      {position.type}
                    </span>
                  </div>

                  <div className='md:hidden flex flex-col gap-2 w-full'>
                    <h3 className='font-sans font-medium text-lg text-white'>
                      {position.title}
                    </h3>
                    <div className='flex justify-between gap-4 text-sm'>
                      <span className='font-mono text-white/70'>
                        {position.location}
                      </span>
                      <span className='font-mono text-white/70'>
                        {position.type}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='md:grid md:grid-cols-10 md:gap-4 xl:gap-5 md:w-[calc(100%-3rem)]'>
                  <div className='pt-4 pb-2 md:col-span-7 md:col-start-4'>
                    <PortableText
                      value={position.description as PortableTextBlock[]}
                    />
                    <Link
                      href={`/contact-us`}
                      className={cn(
                        buttonVariants({
                          variant: 'default',
                        }),
                        'mt-8'
                      )}
                    >
                      Apply <span className='highlight'>/now</span>
                      <Rocket className='size-5' />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

const NoOpenPositionsSection = () => {
  return (
    <section className='px-side md:grid md:grid-cols-12 gap-4 xl:gap-5 pt-16 sm:pt-15 md:pt-18 lg:pt-24 xl:pt-31'>
      <div className='col-span-full md:col-span-10 md:col-start-2 xl:col-span-7 xl:col-start-3 3xl:col-span-5 3xl:col-start-4'>
        <h3>
          We're Not Hiring Right Now,
          <br />
          But the Future Is Always in Motion.
        </h3>
        <p className='text-sm font-mono mt-6'>
          At the moment, we don't have any open positions. Still, we're always
          interested in meeting talented professionals who share our passion for
          reliability, precision, and innovation in digital infrastructure. If
          you believe your expertise could strengthen our team, feel free to get
          in touch through the contact link bellow or follow us on LinkedIn for
          future opportunities.
        </p>
        <Link
          href={`/contact-us`}
          className={cn(
            buttonVariants({
              variant: 'default',
            }),
            'mt-8'
          )}
        >
          Contact Us <span className='highlight'>/now</span>
        </Link>
      </div>
    </section>
  );
};
