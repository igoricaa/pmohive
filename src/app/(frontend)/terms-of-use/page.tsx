import PortableText from '@/components/portable-text';
import Heading from '@/components/ui/heading';
import { getTermsOfUseData } from '@/sanity/lib/queries';
import { PortableTextBlock } from 'next-sanity';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Terms of Use | PMO Hive',
  description: 'Terms and conditions for using our website',
};

export default async function TermsOfUsePage() {
  const data = await getTermsOfUseData();
  const terms = data.termsOfUse;

  if (!terms) {
    notFound();
  }

  const lastUpdated = terms.lastUpdated
    ? new Date(terms.lastUpdated).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className='pt-30 sm:pt-38 lg:pt-44 pb-16 sm:pb-18 xl:pb-21 2xl:pb-25 px-side'>
      <div className='max-w-4xl mx-auto'>
        <Heading level='h1'>{terms.title}</Heading>

        <div className='mt-4 flex flex-wrap gap-4 text-sm text-foreground/60'>
          {terms.version && <p>Version {terms.version}</p>}
          {lastUpdated && <p>Last updated: {lastUpdated}</p>}
        </div>

        {terms.introContent && (
          <div className='mt-8'>
            <PortableText value={terms.introContent as PortableTextBlock[]} />
          </div>
        )}

        <div className='mt-8'>
          <PortableText value={terms.content as PortableTextBlock[]} />
        </div>

        {terms.termlyEmbedUrl && (
          <div className='mt-12'>
            <iframe
              src={terms.termlyEmbedUrl}
              className='h-96 w-full rounded-lg border border-border'
              title='Terms of Use'
            />
          </div>
        )}
      </div>
    </main>
  );
}
