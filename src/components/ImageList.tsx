import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';

import { Image } from '@/services/searchAlbums';
import { ImageCard } from './ImageCard';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

export function ImageList({ images }: { images: Image[] }) {
  // TODO: Persist this
  const [fullscreenImage, setFullscreenImage] = useState<Image | null>(null);

  return (
    <Dialog
      open={fullscreenImage !== null}
      onOpenChange={(open) => {
        if (!open) setFullscreenImage(null);
      }}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((image) => (
          <div
            onClick={() => {
              setFullscreenImage(image);
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
