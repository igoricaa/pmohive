import PortableText from '@/components/portable-text';
import Heading from '@/components/ui/heading';
import { getPrivacyPolicyData } from '@/sanity/lib/queries';
import { PortableTextBlock } from 'next-sanity';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { BlockContent } from '../../../../sanity.types';

export async function generateMetadata(): Promise<Metadata> {
  const { privacyPolicy } = await getPrivacyPolicyData();

  if (!privacyPolicy) {
    return {};
  }

  return generatePageMetadata({
    title: privacyPolicy.seo?.metaTitle || 'Privacy Policy',
    description:
      (privacyPolicy.seo?.metaDescription as string) ||
      (privacyPolicy.introContent as BlockContent),
    image: privacyPolicy.seo?.ogImage as SanityImageSource,
    seo: privacyPolicy.seo,
    path: '/privacy-policy',
  });
}

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicyData();
  const policy = data.privacyPolicy;

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

        {policy.introContent && (
          <div className='mt-8'>
            <PortableText value={policy.introContent as PortableTextBlock[]} />
          </div>
        )}

        <div className='mt-8'>
          <PortableText value={policy.content as PortableTextBlock[]} />
        </div>

        {policy.termlyEmbedUrl && (
          <div className='mt-12'>
            <iframe
              src={policy.termlyEmbedUrl}
              className='h-96 w-full rounded-lg border border-border'
              title='Privacy Policy'
            />
          </div>
        )}
      </div>
    </main>
  );
}
