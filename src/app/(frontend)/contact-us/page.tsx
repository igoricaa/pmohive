import PortableText from '@/components/portable-text';
import Heading from '@/components/ui/heading';
import { getContactPageData } from '@/sanity/lib/queries';
import { PortableTextBlock } from 'next-sanity';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/contact-form';
import { GoogleMap } from '@/components/google-map';

export default async function ContactPage() {
  const { contactPage: contactPageData } = await getContactPageData();

  if (!contactPageData) {
    return notFound();
  }

  return (
    <main className='pt-8 xl:pt-16 pb-16 sm:pb-18 xl:pb-21 2xl:pb-25 px-side md:grid md:grid-cols-12 md:gap-x-4 xl:gap-x-5'>
      <div className='md:col-span-6 2xl:col-span-5 2xl:col-start-2'>
        <Heading
          level='h1'
          subtitle={{
            text: contactPageData.subtitle.text,
            highlightedText: contactPageData.subtitle.highlightedText,
          }}
        >
          {contactPageData.heading}
        </Heading>
        
        <GoogleMap className='md:hidden w-full h-45 rounded-2xl overflow-hidden mt-6' />

        <div className='hidden md:block mt-4 xl:mt-6'>
          <PortableText
            value={contactPageData.description as PortableTextBlock[]}
          />
        </div>

        <ContactForm className='mt-8 sm:mt-3 xl:mt-6' />
      </div>
      <div className='md:col-span-6 2xl:col-span-5 mt-8 md:mt-0'>
        <GoogleMap className='hidden md:block w-full h-120 lg:h-full rounded-2xl overflow-hidden' />
      </div>
    </main>
  );
}
