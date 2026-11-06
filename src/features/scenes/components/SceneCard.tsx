import { cn } from 'cn';
import { Heart, X } from 'lucide-react';

import type { Scene } from '@/shared/types/scene';

import { getSceneThumbnail } from '../thumbnail';
import { SceneView } from './SceneView';

export const SceneCard = ({
  scene,
  active,
  favorite,
  onToggleFavorite,
  onSelect,
  onRemove,
}: {
  scene: Scene;
  active: boolean;
  favorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
  onRemove?: () => void;
}) => {
  const thumbnail = getSceneThumbnail(scene);

  return (
    <div className="relative">
      <button
        type="button"
        aria-pressed={active}
        onClick={onSelect}
        className="w-full rounded-xl text-left transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <div
          className={cn(
            'relative aspect-video overflow-hidden rounded-xl',
            active && 'ring-1 ring-white/50 ring-offset-2 ring-offset-transparent',
          )}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: scene.kind === 'image' ? scene.focus : undefined }}
            />
          ) : (
            <SceneView scene={scene} />
          )}
        </div>
        <span className="mt-1 block text-sm">{scene.name}</span>
      </button>
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-pressed={favorite}
        aria-label={`Favorite ${scene.name}`}
        className="absolute top-2 right-2 rounded-full bg-black/30 p-1"
      >
        <Heart className={cn('size-4', favorite && 'fill-current text-rose-400')} />
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${scene.name}`}
          className="absolute top-2 left-2 rounded-full bg-black/30 p-1"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};
