import { createFileRoute } from '@tanstack/react-router';

import { Error } from '@/components/Error';
import { ImageCard } from '@/components/ImageCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { fetchAlbum } from '@/services/fetchAlbum';

export const Route = createFileRoute('/album/$albumId')({
  component: AlbumComponent,
  loader: async ({ params }) => fetchAlbum(params.albumId),
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

      {album.images.length === 1 && (
        <div className="w-[50vw] m-auto">
          <ImageCard image={album.images[0]} />
        </div>
      )}

      {/* TODO: Add Carousel https://ui.shadcn.com/docs/components/carousel */}
      {album.images.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4">
          {album.images.map((image) => (
            <div className="max-w-[19vw]" key={image.id}>
              <ImageCard image={image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
