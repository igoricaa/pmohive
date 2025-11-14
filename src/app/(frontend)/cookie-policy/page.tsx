import Heading from '@/components/ui/heading';
import { getCookiePolicyData } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import LegalPageContent from '@/components/legal/legal-page-content';

export async function generateMetadata(): Promise<Metadata> {
  const { cookiePolicy } = await getCookiePolicyData();

  if (!cookiePolicy) {
    return {};
  }

  return generatePageMetadata({
    title: cookiePolicy.seo?.metaTitle || 'Cookie Policy',
    description:
      cookiePolicy.seo?.metaDescription ||
      (cookiePolicy.introContent as any) ||
      'Cookie Policy',
    image: cookiePolicy.seo?.ogImage as SanityImageSource,
    seo: cookiePolicy.seo,
    path: '/cookie-policy',
  });
}

export default async function CookiePolicyPage() {
  const data = await getCookiePolicyData();
  const policy = data.cookiePolicy;

  if (!policy) {
    notFound();
  }

  const lastUpdated = policy.lastUpdated
    ? new Date(policy.lastUpdated).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className='pt-30 sm:pt-38 lg:pt-44 pb-16 sm:pb-18 xl:pb-21 2xl:pb-25 px-side'>
      <div className='max-w-4xl mx-auto'>
        <Heading level='h1'>{policy.title}</Heading>

        <div className='mt-4 flex flex-wrap gap-4 text-sm text-foreground/60'>
          {policy.version && <p>Version {policy.version}</p>}
          {lastUpdated && <p>Last updated: {lastUpdated}</p>}
        </div>

        {policy.content && policy.content.length > 0 ? (
          <div className='mt-8'>
            <LegalPageContent content={policy.content as any} />
          </div>
        ) : (
          policy.introContent && (
            <div className='mt-8'>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                Legacy content format - please migrate to composable blocks in Sanity Studio
              </p>
            </div>
          )
        )}

        {policy.termlyEmbedUrl && (
          <div className='mt-12'>
            <iframe
              src={policy.termlyEmbedUrl}
              className='h-96 w-full rounded-lg border border-border'
              title='Cookie Policy'
            />
          </div>
        )}
      </div>
    </main>
  );
}
