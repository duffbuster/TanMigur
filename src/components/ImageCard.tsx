import { Image } from '@/services/searchAlbums';

export function ImageCard({ image }: { image: Image }) {
  return (
    <>
      {image.type === 'video/mp4' ? (
        <video
          className="w-full"
          disablePictureInPicture
          src={image.link}
          autoPlay
          controls={false}
          loop
          muted
        />
      ) : (
        <img src={image.link} alt={image.id} className="object-cover" />
      )}
    </>
  );
}
