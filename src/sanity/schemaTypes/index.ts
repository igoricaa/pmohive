import { type SchemaTypeDefinition } from 'sanity';
import {
  aboutSectionType,
  blogSectionType,
  heroSectionType,
  homePageType,
  teamSectionType,
} from './pages/home';
import { contactPageType } from './pages/contactPageType';
import { privacyPolicyType } from './pages/privacyPolicyType';
import { cookiePolicyType } from './pages/cookiePolicyType';
import { termsOfUseType } from './pages/termsOfUseType';
import { postType } from './posts';
import { postCategoryType } from './posts/postCategoryType';
import { blockContentType } from './blockContentType';
import { teamMemberType } from './teamMemberType';
import { subtitleType } from './subtitleType';
import { serviceType } from './services';
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
import { seoType } from './seoType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core types
    seoType,
    generalInfoType,

    // Pages
    homePageType,
    aboutPageType,
    contactPageType,
    privacyPolicyType,
    cookiePolicyType,
    termsOfUseType,
    careersPageType,

    // Sections
    aboutSectionType,
    heroSectionType,
    breakSectionType,
    teamSectionType,
    blogSectionType,
    introSectionType,
    approachSectionType,
    visionSectionType,

    // Content types
    serviceType,
    postType,
    postCategoryType,
    caseStudyType,
    teamMemberType,
    openPositionType,

    // Reusable types
    blockContentType,
    subtitleType,
    buttonType,

    // Case study blocks
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
