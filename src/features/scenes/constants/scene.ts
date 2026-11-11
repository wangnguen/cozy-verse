import { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneSourceKind } from '@/shared/types/scene';

export const DEFAULT_SCENE_ID = 'rainy-tokyo';

export const CUSTOM_SCENE_ID_PREFIX = 'custom-';

export const CUSTOM_SCENE_FALLBACK_NAME: Record<SceneSourceKind, string> = {
  [SCENE_KIND.YOUTUBE]: 'YouTube video',
  [SCENE_KIND.IMAGE]: 'Image',
  [SCENE_KIND.VIDEO]: 'Video',
};

export const MAX_SOUND_VOLUME = 100;
export const DEFAULT_SOUND_VOLUME = 50;
export const MIN_SOUND_VOLUME = 0;
