import { cn } from '@/lib/utils';

interface SubtitleProps {
  children: React.ReactNode;
  highlightedText?: string | null;
  isBefore?: boolean;
  className?: string;
}

const Subtitle = ({
  children,
  highlightedText,
  isBefore,
  className,
}: SubtitleProps) => {
  const highlightedTextClasses =
    'highlight font-mono xl:text-lg 2xl:text-xl font-medium';

  return (
    <p
      className={cn(
        'font-mono text-base xl:text-lg 2xl:text-xl font-medium',
        className
      )}
    >
      {isBefore && (
        <span className={cn(highlightedTextClasses)}>{highlightedText} </span>
      )}
      {children}
      {highlightedText && !isBefore && (
        <span className={cn(highlightedTextClasses)}> {highlightedText}</span>
      )}
    </p>
  );
};

export default Subtitle;
