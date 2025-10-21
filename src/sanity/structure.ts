import {
  BriefcaseIcon,
  FileIcon,
  FolderKanbanIcon,
  GlobeIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(FileIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(
                  S.document().schemaType('homePage').documentId('homePage')
                ),
              S.listItem()
                .title('About Page')
                .icon(InfoIcon)
                .child(
                  S.document().schemaType('aboutPage').documentId('aboutPage')
                ),
              S.listItem()
                .title('Careers Page')
                .icon(BriefcaseIcon)
                .child(
                  S.document()
                    .schemaType('careersPage')
                    .documentId('careersPage')
                ),
              S.listItem()
                .title('Contact Page')
                .icon(MailIcon)
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
            ])
        ),
      S.listItem()
        .title('Posts')
        .icon(FileIcon)
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('Posts')
                .icon(FileIcon)
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Post Categories')
                .icon(FileIcon)
                .child(
                  S.documentTypeList('postCategory').title('Post Categories')
                ),
            ])
        ),
      S.listItem()
        .title('Services')
        .icon(BriefcaseIcon)
        .child(
          S.list()
            .title('Services')
            .items([
              S.listItem()
                .title('Services')
                .icon(BriefcaseIcon)
                .child(S.documentTypeList('service').title('Services')),
            ])
        ),
      S.listItem()
        .title('Projects')
        .icon(FolderKanbanIcon)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('Projects')
                .icon(FolderKanbanIcon)
                .child(S.documentTypeList('project').title('Projects')),
            ])
        ),
      S.listItem()
        .title('Team')
        .icon(UserIcon)
        .child(
          S.list()
            .title('Team')
            .items([
              S.listItem()
                .title('Team Members')
                .icon(UserIcon)
                .child(S.documentTypeList('teamMember').title('Team Members')),
            ])
        ),
      S.listItem()
        .title('Open Positions')
        .icon(BriefcaseIcon)
        .child(
          S.list()
            .title('Open Positions')
            .items([
              S.listItem()
                .title('Open Positions')
                .icon(BriefcaseIcon)
                .child(
                  S.documentTypeList('openPosition').title('Open Positions')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('General Info')
        .icon(GlobeIcon)
        .child(
          S.document().schemaType('generalInfo').documentId('generalInfo')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'aboutPage',
            'contactPage',
            'careersPage',
            'post',
            'service',
            'project',
            'teamMember',
            'generalInfo',
            'postCategory',
            'openPosition',
          ].includes(listItem.getId()!)
      ),
    ]);
