import { cn } from 'cn';

import type { Scene } from '@/shared/types/scene';

import { SceneView } from './SceneView';

export const SceneCard = ({
  scene,
  active,
  onSelect,
}: {
  scene: Scene;
  active: boolean;
  onSelect: () => void;
}) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className="rounded-xl text-left transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <div
        className={cn(
          'relative aspect-video overflow-hidden rounded-xl',
          active && 'ring-1 ring-white/50 ring-offset-2 ring-offset-transparent',
        )}
      >
        <SceneView scene={scene} />
      </div>
      <span className="mt-1 block text-sm">{scene.name}</span>
    </button>
  );
};
