import Image from 'next/image';

export default function Home() {
  return (
    <main className='relative h-screen w-screen flex items-center justify-center'>
      <div className='absolute inset-0 bg-white/60'>
        <Image
          src='/hivebg.jpeg'
          alt='PMOHive '
          fill
          sizes='100vw'
          quality={100}
          priority
          className='object-cover -z-20'
        />
      </div>
      <div className='flex items-center justify-between gap-10 z-10 max-w-7xl 2xl:max-w-[1440px]'>
        <div className='relative w-[600px] aspect-[3000/2381]'>
          <Image src='/pmohive-logo.png' alt='PMO Hive logo' fill priority />
        </div>
        <div className='text-black'>
          <h1 className='text-6xl font-bold'>
            Our Website is
            <br />
            Coming Soon
          </h1>
          <p className='text-2xl text-balance mt-10'>
            In the meantime, please contact us at:
          </p>
          <a
            href='mailto:clarke.shepherd@pmohive.com'
            className='w-fit text-2xl mt-4 block border-b-2 border-accent transition-colors duration-300 delay-100 ease-out hover:text-white relative before:content-[""] before:absolute before:inset-0 before:bg-accent before:w-0 before:transition-width before:duration-300 before:ease-out hover:before:w-full before:-z-10'
          >
            clarke.shepherd@pmohive.com
          </a>
        </div>
      </div>
    </main>
  );
}
