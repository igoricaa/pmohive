import { type SchemaTypeDefinition } from 'sanity';
import { aboutSectionType, blogSectionType, contactSectionType, heroSectionType, homePageType, teamSectionType } from './pages/home';
import { postType } from './posts';
import { blockContentType } from './blockContentType';
import { teamMemberType } from './teamMemberType';
import { generalType } from './generalType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    generalType,
    homePageType,
    aboutSectionType,
    heroSectionType,
    teamSectionType,
    blogSectionType,
    contactSectionType,
    teamMemberType,
    postType,
    blockContentType,
  ],
};
