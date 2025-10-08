import { type SchemaTypeDefinition } from 'sanity';
import { aboutSectionType, blogSectionType, contactSectionType, heroSectionType, homePageType, teamSectionType } from './pages/home';
import { aboutPageType } from './pages/aboutPageType';
import { contactPageType } from './pages/contactPageType';
import { postType } from './posts';
import { blockContentType } from './blockContentType';
import { teamMemberType } from './teamMemberType';
import { generalType } from './generalType';
import { serviceType } from './serviceType';
import { projectType } from './projectType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    generalType,
    homePageType,
    aboutPageType,
    contactPageType,
    aboutSectionType,
    heroSectionType,
    teamSectionType,
    blogSectionType,
    contactSectionType,
    teamMemberType,
    serviceType,
    projectType,
    postType,
    blockContentType,
  ],
};
