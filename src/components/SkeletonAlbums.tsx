import { SkeletonCard } from './SkeletonCard';

export function SkeletonAlbums() {
  return (
    <div className="flex p-8 justify-between gap-4 flex-wrap">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
