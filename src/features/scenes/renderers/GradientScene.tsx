import type { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneOfKind } from '@/shared/types/scene';

type GradientSceneProps = { scene: SceneOfKind<typeof SCENE_KIND.GRADIENT> };

export const GradientScene = ({ scene }: GradientSceneProps) => {
  return <div className="size-full" style={{ backgroundImage: scene.gradient }} />;
};
