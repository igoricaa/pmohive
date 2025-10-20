'use client';

import { useQueryState, parseAsString, debounce } from 'nuqs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SearchInput({ className }: { className?: string }) {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      history: 'push',
    })
  );

  return (
    <div className={cn('relative', className)}>
      <p className='font-mono text-xxs absolute -top-4.5 left-0 font-medium'>
        Search
      </p>

      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Input
        type='text'
        placeholder='Type here...'
        value={search}
        onChange={(e) =>
          setSearch(e.target.value, {
            limitUrlUpdates: e.target.value === '' ? undefined : debounce(500),
          })
        }
        className='pl-9'
      />
    </div>
  );
}
