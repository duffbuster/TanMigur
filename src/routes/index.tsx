/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import { Input } from '@/components/ui/input';
import { searchAlbums } from '@/services/searchAlbums';
import { AlbumCard } from '@/components/AlbumCard';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const { error, data, isFetching } = useQuery({
    retry: false,
    refetchOnMount: false,
    enabled: searchTerm.length > 0,
    queryKey: ['albums', searchTerm],
    queryFn: () => searchAlbums(searchTerm),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Debounce the search input, ensures we don't request every keypress
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedHandleChange = debounce(handleChange, 300);

  return (
    <div className="p-2">
      <Input
        type="text"
        className="outline-0"
        placeholder="Search for an album"
        onChange={(event) => debouncedHandleChange(event)}
      />

      {isFetching && <div>Loading...</div>}

      {error && <div>Error: {error.message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10">
        {data &&
          data.map((album) => (
            <div className="flex justify-center" key={album.id}>
              <AlbumCard album={album} />
            </div>
          ))}
      </div>
    </div>
  );
}
