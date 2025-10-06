import { type SchemaTypeDefinition } from 'sanity';
import { aboutSectionType, contactSectionType, heroSectionType, homePageType, teamSectionType } from './pages/home';
import { postType } from './posts';
import { blockContentType } from './blockContentType';
import { teamMemberType } from './teamMemberType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePageType,
    aboutSectionType,
    heroSectionType,
    teamSectionType,
    contactSectionType,
    teamMemberType,
    postType,
    blockContentType,
  ],
};
