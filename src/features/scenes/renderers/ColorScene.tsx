import type { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneOfKind } from '@/shared/types/scene';

type ColorSceneProps = { scene: SceneOfKind<typeof SCENE_KIND.COLOR> };

export const ColorScene = ({ scene }: ColorSceneProps) => {
  return <div className="size-full" style={{ backgroundColor: scene.color }} />;
};
