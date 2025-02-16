import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';

import { Image } from '@/services/searchAlbums';
import { ImageCard } from './ImageCard';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/album.$albumId';

export function ImageList({ images }: { images: Image[] }) {
  const { fullscreen } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [fullscreenImage, setFullscreenImage] = useState<Image | null>(
    images.find((image) => image.id === fullscreen) || null,
  );

  return (
    <Dialog
      open={fullscreenImage !== null}
      onOpenChange={(open) => {
        if (!open) {
          setFullscreenImage(null);
          navigate({ search: { fullscreen: undefined } });
        }
      }}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((image) => (
          <div
            onClick={() => {
              setFullscreenImage(image);
              navigate({ search: { fullscreen: image.id } });
            }}
            className="max-w-[19vw] cursor-pointer"
            key={image.id}
          >
            <ImageCard image={image} />
          </div>
        ))}
      </div>

      {fullscreenImage && (
        <DialogContent
          className="p-0 !max-w-5xl !max-h-full bg-transparent border-0 justify-center"
          aria-describedby={fullscreenImage.description}
        >
          <VisuallyHidden asChild>
            <DialogTitle>{fullscreenImage.title}</DialogTitle>
          </VisuallyHidden>
          <ImageCard image={fullscreenImage} />
        </DialogContent>
      )}
    </Dialog>
  );
}
