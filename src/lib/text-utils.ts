import { BlockContent } from '../../sanity.types';

/**
 * Extract plain text from Sanity Portable Text blocks
 * Useful for converting rich text content to meta descriptions or structured data
 *
 * @param blocks - Portable Text blocks from Sanity CMS
 * @returns Plain text string with all formatting removed
 */
export function extractPlainText(
  blocks: BlockContent | undefined | null
): string {
  if (!blocks) return '';

  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => {
      if ('children' in block) {
        return block.children
          ?.filter((child: any) => child._type === 'span')
          .map((child: any) => child.text)
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}
