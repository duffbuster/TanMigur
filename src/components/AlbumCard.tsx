import React from 'react';

import { Album } from '@/services/searchAlbums';
import { Card } from './ui/card';

export function AlbumCard({ album }: { album: Album }) {
  const [coverImage] = React.useState(
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
    <Card className="w-full">
      {coverImage.type === 'video/mp4' ? (
        <video
          className="w-full"
          disablePictureInPicture
          src={coverImage.link}
          autoPlay
          controls={false}
          loop
          muted
        />
      ) : (
        <img src={coverImage.link} alt={album.title} className="object-cover" />
      )}
    </Card>
  );
}
