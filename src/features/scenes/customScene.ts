import { SCENE_GROUP, SCENE_KIND } from '@/shared/constants/scene';
import type { Scene, SceneSource } from '@/shared/types/scene';

import { CUSTOM_SCENE_FALLBACK_NAME } from './constants/scene';

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const fileName = (src: string) => {
  const segment = new URL(src).pathname.split('/').pop() ?? '';
  return safeDecode(segment)
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
};

const sceneName = (source: SceneSource) => {
  if (source.kind === SCENE_KIND.YOUTUBE) return CUSTOM_SCENE_FALLBACK_NAME[source.kind];
  return fileName(source.src) || CUSTOM_SCENE_FALLBACK_NAME[source.kind];
};

export const sourceKey = (scene: Scene | SceneSource): string | undefined => {
  switch (scene.kind) {
    case SCENE_KIND.YOUTUBE:
      return `${scene.kind}:${scene.videoId}`;
    case SCENE_KIND.IMAGE:
    case SCENE_KIND.VIDEO:
      return `${scene.kind}:${scene.src}`;
    default:
      return undefined;
  }
};

export const createCustomScene = (source: SceneSource, id: string): Scene => ({
  ...source,
  id,
  name: sceneName(source),
  group: SCENE_GROUP.CUSTOM,
});
