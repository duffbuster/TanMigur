import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import { Album } from '@/services/searchAlbums';
import { ImageCard } from './ImageCard';
import { Card } from './ui/card';

/**
 * A card for an album, clicking on the card opens the album page.
 */
export function AlbumCard({ album }: { album: Album }) {
  // I would probably make this component more presentational by
  // moving this logic to the parent component
  const [coverImage] = useState(
    album.images.find((image) => image.id === album.cover),
  );

  if (!coverImage) {
    return (
      <Card className="w-full">
        <h2 className="text-lg font-bold">{album.title}</h2>
        <p>{album.description}</p>
      </Card>
    );
  }

  return (
    <Link
      to="/album/$albumId"
      params={{ albumId: album.id }}
      // It's kinda annoying that you have to do this...
      search={{ fullscreen: undefined }}
    >
      <Card className="w-full cursor-pointer">
        <ImageCard image={coverImage} />
      </Card>
    </Link>
  );
}
