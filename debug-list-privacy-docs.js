import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'b1y8fomg',
  dataset: 'dev',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function listPrivacyDocs() {
  const docs = await client.fetch(
    `*[_type == "privacyPolicy"] | order(_createdAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "hasContent": defined(content),
      "contentBlocks": count(content)
    }`
  );
  
  console.log('All Privacy Policy documents:');
  console.log(JSON.stringify(docs, null, 2));
}

listPrivacyDocs().catch(console.error);
