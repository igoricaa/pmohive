import Heading from '@/components/ui/heading';
import { getTermsOfUseData } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { BlockContent } from '../../../../sanity.types';
import LegalPageContent from '@/components/legal/legal-page-content';

export async function generateMetadata(): Promise<Metadata> {
  const { termsOfUse } = await getTermsOfUseData();

  if (!termsOfUse) {
    return {};
  }

  return generatePageMetadata({
    title: termsOfUse.seo?.metaTitle || 'Terms of Use',
    description:
      termsOfUse.seo?.metaDescription ||
      (termsOfUse.introContent as any) ||
      'Terms of Use',
    image: termsOfUse.seo?.ogImage as SanityImageSource,
    seo: termsOfUse.seo,
    path: '/terms-of-use',
  });
}

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

        {terms.content && terms.content.length > 0 ? (
          <div className='mt-8'>
            <LegalPageContent content={terms.content as any} />
          </div>
        ) : (
          terms.introContent && (
            <div className='mt-8'>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                Legacy content format - please migrate to composable blocks in Sanity Studio
              </p>
            </div>
          )
        )}

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
