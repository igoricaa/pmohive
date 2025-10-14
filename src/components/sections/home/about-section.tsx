import { TextGradientScroll } from '@/components/ui/text-gradient-scroll';
import { Stat } from '@/lib/types';
import StatCard from './stat-card';
import { cn } from '@/lib/utils';

type AboutSectionType = {
  heading: {
    text: string;
    highlightedText: string;
  };
  aboutText: string;
  stats: Stat[];
};

const AboutSection = ({ heading, aboutText, stats }: AboutSectionType) => {
  return (
    <section>
      <div className='flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl mx-auto'>
        <p className='font-mono text-base xl:text-lg font-medium text-center'>
          {heading.text}
          <span className='font-mono highlight xl:text-lg 2xl:text-xl font-medium ml-2.5'>
            {heading.highlightedText}
          </span>
        </p>
        <TextGradientScroll
          text={aboutText}
          className='text-2xl sm:text-3xl xl:text-4xl font-semibold xl:font-medium justify-center'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5 sm:gap-x-4 sm:gap-y-8 lg:gap-y-0 py-12 sm:pt-17 sm:pb-16 xl:py-27'>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.statTitle}
            stat={stat}
            className={cn((index === 1 || index === 3) && 'lg:mt-10')}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
