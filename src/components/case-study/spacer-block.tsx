import type { SpacerBlock } from '../../../sanity.types';

export default function SpacerBlock({
  height,
}: {
  height: SpacerBlock['height'];
}) {
  return <div style={{ height: `${height}px` }} aria-hidden='true' />;
}
