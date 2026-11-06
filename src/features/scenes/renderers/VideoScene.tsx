import type { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneOfKind } from '@/shared/types/scene';

type VideoSceneProps = { scene: SceneOfKind<typeof SCENE_KIND.VIDEO> };

export const VideoScene = ({ scene }: VideoSceneProps) => {
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
