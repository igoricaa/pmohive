import { routes } from '@/app/data';
import { urlFor } from '@/sanity/lib/image';
import { getGeneralInfoData } from '@/sanity/lib/queries';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import { Link } from '@/components/motion-link';

import MenuLink from '../menuLink';
import Sidebar from './sidebar';
import { GeneralInfo } from '../../../sanity.types';
import MobileMenu from './mobile-menu';
import StickyHeaderWrapper from './sticky-header-wrapper';

export async function Header() {
  const { generalInfo: generalInfoData } = await getGeneralInfoData();

  if (!generalInfoData) {
    return <header>Loading...</header>;
  }

  const { logoFull, email, phone, socials } = generalInfoData;

  return (
    <StickyHeaderWrapper
      topBar={<TopBar phone={phone} email={email} />}
      mainBar={<MainBar logoFull={logoFull} socials={socials} />}
    />
  );
}

export default Header;

const TopBar = ({ phone, email }: { phone: string; email: string }) => {
  return (
    <div className='flex justify-between items-center py-2 sm:py-4 xl:py-5 border-b-1 border-white/30'>
      <Link
        href='/careers-and-culture'
        className='font-semibold text-light-grey text-xs sm:text-sm lg:text-base whitespace-nowrap'
      >
        Careers and Culture
      </Link>

      <div className='flex gap-3 items-center'>
        <Link
          href={'tel:' + phone}
          className='font-semibold text-light-grey text-xs sm:text-sm lg:text-base whitespace-nowrap'
        >
          {phone}
        </Link>
        <span className='text-light-grey text-base font-light'>|</span>
        <Link
          href={'mailto:' + email}
          className='font-semibold text-light-grey text-xs sm:text-sm lg:text-base whitespace-nowrap'
        >
          {email}
        </Link>
      </div>
    </div>
  );
};

const MainBar = ({
  logoFull,
  socials,
}: {
  logoFull: SanityImageSource;
  socials: GeneralInfo['socials'];
}) => {
  return (
    <div className='flex justify-between items-center pt-3 pb-2 sm:pt-4 sm:pb-0'>
      <Link href='/'>
        <Image
          src={urlFor(logoFull).url()}
          alt='PMO Hive logo'
          width={246}
          height={126}
          unoptimized
          priority
          className='h-full w-20 sm:w-23 lg:w-31'
        />
      </Link>

      <div className='flex items-center gap-4'>
        <div className='hidden lg:flex items-center gap-6'>
          {routes.map((route) => (
            <MenuLink key={route.path} route={route} />
          ))}
        </div>

        <Sidebar socials={socials} />
        <MobileMenu socials={socials} />
      </div>
    </div>
  );
};
