import type { DividerBlock } from '../../../sanity.types';

export default function DividerBlock({
  height,
}: {
  height: DividerBlock['height'];
}) {
  return (
    <div
      style={{
        paddingTop: `${height / 2}px`,
        paddingBottom: `${height / 2}px`,
      }}
    >
      <hr className='border-t border-white/20' />
    </div>
  );
}
