import Image from 'next/image';

export default function Home() {
  return (
    <main className='relative h-screen w-screen flex items-center justify-center'>
      <Image
        src='/hivebg.jpeg'
        alt='PMOHive '
        fill
        sizes='100vw'
        quality={100}
        priority
        className='object-cover -z-10'
      />
      <div className='flex items-center justify-between gap-4'>
        <div className='relative w-[600px] aspect-[3000/2381]'>
          <Image src='/pmohive-logo.png' alt='PMO Hive logo' fill priority />
        </div>
        <div className='text-black'>
          <h1 className='text-6xl font-bold'>Welcome to PMO Hive</h1>
          <p className='text-xl text-balance mt-10'>
            We are a community of project managers, PMOs, and other project
            management professionals.
          </p>
          <a
            href='mailto:clarke.shepherd@pmohive.com'
            className='text-xl mt-12 block'
          >
            clarke.shepherd@pmohive.com
          </a>
        </div>
      </div>
    </main>
  );
}
