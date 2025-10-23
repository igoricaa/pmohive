import { type SchemaTypeDefinition } from 'sanity';
import {
  aboutSectionType,
  blogSectionType,
  heroSectionType,
  homePageType,
  teamSectionType,
} from './pages/home';
import { contactPageType } from './pages/contactPageType';
import { postType } from './posts';
import { postCategoryType } from './posts/postCategoryType';
import { blockContentType } from './blockContentType';
import { teamMemberType } from './teamMemberType';
import { subtitleType } from './subtitleType';
import { serviceType } from './services';
import { projectType } from './projectType';
import { generalInfoType } from './generalInfoType';
import { buttonType } from './buttonType';
import { aboutPageType } from './pages/about-us';
import { breakSectionType } from './breakSectionType';
import { introSectionType } from './introSectionType';
import { visionSectionType } from './pages/about-us/visionSectionType';
import { approachSectionType } from './pages/about-us/approachSectionType';
import { openPositionType } from './openPositionType';
import { careersPageType } from './pages/careers';
import {
  caseStudyType,
  headingBlockType,
  headingTextBlockType,
  textareaBlockType,
  imageBlockType,
  textGridBlockType,
  textGridItemType,
  spacerBlockType,
  dividerBlockType,
} from './case-study';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    generalInfoType,
    homePageType,
    aboutPageType,
    contactPageType,
    aboutSectionType,
    heroSectionType,
    breakSectionType,
    teamSectionType,
    blogSectionType,
    teamMemberType,
    serviceType,
    projectType,
    postType,
    postCategoryType,
    blockContentType,
    subtitleType,
    buttonType,
    introSectionType,
    approachSectionType,
    visionSectionType,
    openPositionType,
    careersPageType,
    caseStudyType,
    headingBlockType,
    headingTextBlockType,
    textareaBlockType,
    imageBlockType,
    textGridBlockType,
    textGridItemType,
    spacerBlockType,
    dividerBlockType,
  ],
};
