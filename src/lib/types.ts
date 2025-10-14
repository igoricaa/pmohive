import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { BlockContent } from '../../sanity.types';
import { PortableTextBlock } from 'next-sanity';

export type Route = {
  path: string;
  label: string;
  children?: Route[];
};

export type Stat = {
  statTitle: string;
  statValue: string;
  statIcon: SanityImageSource & { alt: string };
  statDescription: PortableTextBlock[];
};
