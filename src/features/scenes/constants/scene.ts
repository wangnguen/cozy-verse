import { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneSourceKind } from '@/shared/types/scene';

export const DEFAULT_SCENE_ID = 'rainy-tokyo';

export const CUSTOM_SCENE_ID_PREFIX = 'custom-';

export const CUSTOM_SCENE_FALLBACK_NAME: Record<SceneSourceKind, string> = {
  [SCENE_KIND.YOUTUBE]: 'YouTube video',
  [SCENE_KIND.IMAGE]: 'Image',
  [SCENE_KIND.VIDEO]: 'Video',
};
