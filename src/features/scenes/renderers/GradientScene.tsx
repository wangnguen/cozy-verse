import type { Scene } from '@/shared/types/scene';

type GradientSceneProps = Extract<Scene, { kind: 'gradient' }>;

export const GradientScene = ({ scene }: { scene: GradientSceneProps }) => {
  return <div className="size-full" style={{ backgroundImage: scene.gradient }} />;
};
