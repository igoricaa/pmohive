import { PortableTextBlock } from 'next-sanity';
import PortableTextBlockComponent from './portable-text-block';
import TableBlock from './table-block';

interface TableRow {
  _key: string;
  cells: string[];
}

interface TableValue {
  rows: TableRow[];
}

interface PortableTextBlockType {
  _type: 'portableTextBlock';
  _key: string;
  content: PortableTextBlock[];
}

interface TableBlockType {
  _type: 'tableBlock';
  _key: string;
  table: TableValue;
  caption?: string;
}

type ContentBlock = PortableTextBlockType | TableBlockType;

interface LegalPageContentProps {
  content: ContentBlock[];
}

export default function LegalPageContent({ content }: LegalPageContentProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className='space-y-6 sm:space-y-8'>
      {content.map((block) => {
        switch (block._type) {
          case 'portableTextBlock':
            return (
              <PortableTextBlockComponent
                key={block._key}
                content={block.content}
              />
            );

          case 'tableBlock':
            return (
              <TableBlock
                key={block._key}
                table={block.table}
                caption={block.caption}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
