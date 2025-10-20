import Heading from '@/components/ui/heading';

export default async function Blog() {
  return (
    <main>
      <div className='grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5'>
        <Heading
          level='h1'
          subtitle={{ text: 'news', highlightedText: '/pmo' }}
          className='col-span-full xl:col-start-2'
        >
          Stay in the loop
        </Heading>

        <div className='col-span-full xl:col-span-10 xl:col-start-2'>
            
        </div>
      </div>
    </main>
  );
}
