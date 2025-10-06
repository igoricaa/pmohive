import { FileIcon, GlobeIcon, HomeIcon } from 'lucide-react';
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
      S.divider(),
      // S.listItem()
      //   .title('General')
      //   .icon(GlobeIcon)
      //   .child(
      //     S.document().schemaType('generalInfo').documentId('generalInfo')
      //   ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['homePage', 'post'].includes(listItem.getId()!)
      ),
    ]);
