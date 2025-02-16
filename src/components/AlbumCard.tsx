import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import { Album } from '@/services/searchAlbums';
import { ImageCard } from './ImageCard';
import { Card } from './ui/card';

export function AlbumCard({ album }: { album: Album }) {
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
    <Link to="/album/$albumId" params={{ albumId: album.id }}>
      <Card className="w-full cursor-pointer">
        <ImageCard image={coverImage} />
      </Card>
    </Link>
  );
}
