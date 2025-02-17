import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { Route } from '@/routes/album.$albumId';
import { Image } from '@/services/searchAlbums';
import { ImageCard } from './ImageCard';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

/**
 * A list of images that can be clicked to view larger (it's not really fullscreen don't judge me).
 */
export function ImageList({ images }: { images: Image[] }) {
  const { fullscreen } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [fullscreenImage, setFullscreenImage] = useState<Image | null>(
    images.find((image) => image.id === fullscreen) || null,
  );

  return (
    // I don't love the dialog that shadcn provides...
    // if I had more time, I would just use the radix primitives and roll my own.
    // I suppose this dialog context could wrap the whole app...
    <Dialog
      open={fullscreenImage !== null}
      onOpenChange={(open) => {
        if (!open) {
          setFullscreenImage(null);
          // Not the cleanest way to persist the fullscreen image, but by God it works
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

      {/* Don't think I actually need to check this to get the dialog to work, but it prevents my from having to use optional chaining further down */}
      {fullscreenImage && (
        // FIXME: this looks fine for images in landscape, but portrait is not respecting the screen height
        // I'd spend more time tweaking the styles, but honestly who has the time?
        <DialogContent
          className="p-0 !max-w-5xl !max-h-full bg-transparent border-0 justify-center"
          // Important for screen readers
          aria-describedby={fullscreenImage.description}
        >
          {/* resolves a11y warnings about not having a title */}
          <VisuallyHidden asChild>
            <DialogTitle>{fullscreenImage.title}</DialogTitle>
          </VisuallyHidden>

          <ImageCard image={fullscreenImage} />
        </DialogContent>
      )}
    </Dialog>
  );
}
