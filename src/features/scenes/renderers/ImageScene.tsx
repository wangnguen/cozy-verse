import type { Scene } from '@/shared/types/scene';

type ImageSceneProps = Extract<Scene, { kind: 'image' }>;

export const ImageScene = ({ scene }: { scene: ImageSceneProps }) => {
  if (scene.fit === 'contain') {
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
