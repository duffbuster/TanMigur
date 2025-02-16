import { Album } from '@/services/searchAlbums';
import { AlbumCard } from './AlbumCard';

export function AlbumList({ albums }: { albums: Album[] }) {
  return (
    <div className="flex flex-wrap mt-10">
      {albums.map((album) => (
        <div className="flex justify-center max-w-[19vw]" key={album.id}>
          <AlbumCard album={album} />
        </div>
      ))}
    </div>
  );
}
