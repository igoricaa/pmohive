import { type SchemaTypeDefinition } from 'sanity';
import { aboutSectionType, heroSectionType, homePageType } from './pages/home';
import { postType } from './posts';
import { blockContentType } from './blockContentType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePageType,
    aboutSectionType,
    heroSectionType,
    postType,
    blockContentType,
  ],
};
