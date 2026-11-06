import { IMAGE_FIT, type SCENE_KIND } from '@/shared/constants/scene';
import type { SceneOfKind } from '@/shared/types/scene';

type ImageSceneProps = { scene: SceneOfKind<typeof SCENE_KIND.IMAGE> };

export const ImageScene = ({ scene }: ImageSceneProps) => {
  if (scene.fit === IMAGE_FIT.CONTAIN) {
    return (
      <>
        <img
          className="absolute inset-0 size-full scale-110 object-cover blur-2xl brightness-75"
          src={scene.src}
          alt=""
          aria-hidden
        />
        <img
          className="absolute inset-0 size-full object-contain"
          src={scene.src}
          alt={scene.name}
        />
      </>
    );
  }

  return (
    <img
      className="absolute inset-0 size-full object-cover"
      style={{ objectPosition: scene.focus }}
      src={scene.src}
      alt={scene.name}
    />
  );
};
