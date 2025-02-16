import { createFileRoute } from '@tanstack/react-router';

import { Error } from '@/components/Error';
import { ImageCard } from '@/components/ImageCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { fetchAlbum } from '@/services/fetchAlbum';
import { ImageList } from '@/components/ImageList';

export const Route = createFileRoute('/album/$albumId')({
  component: AlbumComponent,
  loader: async ({ params }) => fetchAlbum(params.albumId),
  validateSearch: (search) => ({
    fullscreen:
      typeof search.fullscreen === 'string' ? search.fullscreen : undefined,
  }),
  errorComponent: ({ error }) => (
    <Error title="Error getting album" message={error.message} />
  ),
  pendingComponent: () => (
    <div className="p-8 align-center">
      <SkeletonCard />
    </div>
  ),
});

function AlbumComponent() {
  const album = Route.useLoaderData();

  return (
    <div className="p-8 text-center">
      <h1 className="mb-10">{album.title}</h1>

      {/* TODO: Back to search button */}

      {album.images.length === 1 && (
        <div className="w-[40vw] m-auto">
          <ImageCard image={album.images[0]} />
        </div>
      )}

      {album.images.length > 1 && <ImageList images={album.images} />}
    </div>
  );
}
