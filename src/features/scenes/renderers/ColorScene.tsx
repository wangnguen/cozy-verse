import type { Scene } from '@/shared/types/scene';

type ColorSceneProp = Extract<Scene, { kind: 'color' }>;

export const ColorScene = ({ scene }: { scene: ColorSceneProp }) => {
  return <div className="size-full" style={{ backgroundColor: scene.color }} />;
};
