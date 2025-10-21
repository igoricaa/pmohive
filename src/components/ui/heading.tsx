import { cn } from '@/lib/utils';
import Subtitle from './subtitle';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  subtitleClassName?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  subtitle?: {
    text: string;
    highlightedText?: string | null;
    isBefore?: boolean;
  } | null;
  spacing?: string;
}

const Heading = ({
  className,
  subtitleClassName,
  headingClassName,
  children,
  subtitle,
  spacing = 'mt-2',
  level = 'h2',
}: HeadingProps) => {
  const Tag = level;

  return (
    <div className={cn(className)}>
      {subtitle && (
        <Subtitle
          highlightedText={subtitle.highlightedText}
          isBefore={subtitle.isBefore}
          className={subtitleClassName}
        >
          {subtitle.text}
        </Subtitle>
      )}
      {/* xl:mt-4.5 */}
      <Tag className={cn(spacing, headingClassName)}>{children}</Tag>
    </div>
  );
};

export default Heading;
