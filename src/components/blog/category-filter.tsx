'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { usePostCategories } from '@/hooks/use-post-categories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type CategoryFilterProps = {
  className?: string;
};

export default function CategoryFilter({ className }: CategoryFilterProps) {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all').withOptions({
      history: 'push',
    })
  );
  const { data: categories, isLoading } = usePostCategories();

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Loading...' />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder='All Categories' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All Categories</SelectItem>
        {categories?.map((cat) => (
          <SelectItem key={cat._id} value={cat._id}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
