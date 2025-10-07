import { FileIcon, GlobeIcon, HomeIcon, UserIcon } from 'lucide-react';
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
      S.divider(),
      S.listItem()
        .title('General')
        .icon(GlobeIcon)
        .child(
          S.document().schemaType('general').documentId('general')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['homePage', 'post', 'teamMember', 'general'].includes(listItem.getId()!)
      ),
    ]);
