import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ChangeEvent, useState } from 'react';

import { AlbumList } from '@/components/AlbumList';
import { Error } from '@/components/Error';
import { SkeletonAlbums } from '@/components/SkeletonAlbums';
import { Input } from '@/components/ui/input';
import { searchAlbums } from '@/services/searchAlbums';
import { debounce } from '@/utils/debounce';

export const Route = createFileRoute('/')({
  component: HomeComponent,
  validateSearch: (search) => ({
    searchTerm:
      // Actually typesafe... unlike the docs, which just cast this to string
      typeof search.searchTerm === 'string' ? search.searchTerm : undefined,
  }),
});

function HomeComponent() {
  const { searchTerm: searchParamTerm } = Route.useSearch();
  const [searchTerm, setSearchTerm] = useState(searchParamTerm || '');
  const navigate = useNavigate({ from: Route.fullPath });

  const { error, data, isFetching } = useQuery({
    enabled: searchTerm.length > 0,
    queryKey: ['albums', searchTerm],
    queryFn: () => searchAlbums(searchTerm),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    navigate({ search: { searchTerm: event.target.value } });
  };

  const debouncedHandleChange = debounce(handleChange, 300);

  // FIXME: Should preserve scroll when we come back here...
  return (
    <div className="p-2">
      {/* This should be abstracted to a search component in future state */}
      <Input
        type="text"
        className="outline-0"
        placeholder="Search for an album"
        defaultValue={searchTerm}
        onChange={(event) => debouncedHandleChange(event)}
      />

      {isFetching && <SkeletonAlbums />}

      {error && <Error title="Error" message={error.message} />}

      {data && <AlbumList albums={data} />}
    </div>
  );
}
