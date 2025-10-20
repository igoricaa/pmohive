'use client';

import { useQueryState, parseAsString } from 'nuqs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SortSelectProps = {
  className?: string;
};

export default function SortSelect({ className }: SortSelectProps) {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withDefault('desc').withOptions({
      history: 'push',
    })
  );

  return (
    <Select value={sort} onValueChange={setSort}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder='Sort by date' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='desc'>Newest First</SelectItem>
        <SelectItem value='asc'>Oldest First</SelectItem>
      </SelectContent>
    </Select>
  );
}
