import type { Scene } from '@/shared/types/scene';

type ImageSceneProps = Extract<Scene, { kind: 'image' }>;

export const ImageScene = ({ scene }: { scene: ImageSceneProps }) => {
  return (
    <img className="absolute inset-0 size-full object-cover" src={scene.src} alt={scene.name} />
  );
};
