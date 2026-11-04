import type { Scene } from '@/shared/types/scene';

type VideoSceneProps = Extract<Scene, { kind: 'video' }>;

export const VideoScene = ({ scene }: { scene: VideoSceneProps }) => {
  return (
    <video
      className="absolute inset-0 size-full object-cover"
      src={scene.src}
      poster={scene.poster}
      style={{ objectPosition: scene.focus }}
      autoPlay
      loop
      muted
      playsInline
    />
  );
};
