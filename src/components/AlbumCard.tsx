import React, { useEffect } from 'react';

import { Album } from '@/services/searchAlbums';
import { Card } from './ui/card';

export function AlbumCard({ album }: { album: Album }) {
  const [coverSrc, setCoverSrc] = React.useState('');

  useEffect(() => {
    if (coverSrc) {
      return;
    }

    album.images.forEach((image) => {
      if (image.id === album.cover && image.type === 'image/jpeg') {
        setCoverSrc(image.link);
      }
    });
  }, [album]);

  if (!coverSrc) {
    return null;
  }

  // TODO: I want this to be a flowy, borderless layout
  return (
    <Card>
      {/* TODO: Handle videos */}
      <img
        src={coverSrc}
        alt={album.title}
        className="w-full h-48 object-cover"
      />
      {/* <div className="p-2">
        <h2 className="text-lg font-bold">{album.title}</h2>
        <p>{album.description}</p>
      </div> */}
    </Card>
  );
}
