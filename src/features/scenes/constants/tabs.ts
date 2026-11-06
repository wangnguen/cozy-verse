import { SCENE_GROUP } from '@/shared/constants/scene';

import type { SceneTab } from '../types';

export const SCENE_TAB = {
  ALL: 'all',
  FAVORITES: 'favorites',
} as const;

export const SCENE_TAB_LABELS: Record<SceneTab, string> = {
  [SCENE_TAB.ALL]: 'All',
  [SCENE_TAB.FAVORITES]: 'Favorites',
  [SCENE_GROUP.ANIME]: 'Anime',
  [SCENE_GROUP.CAFE]: 'Café',
  [SCENE_GROUP.NATURE]: 'Nature',
  [SCENE_GROUP.CITY]: 'City',
  [SCENE_GROUP.LIBRARY]: 'Library',
  [SCENE_GROUP.STUDY_WITH_ME]: 'Study With Me',
  [SCENE_GROUP.GRADIENT]: 'Gradient',
  [SCENE_GROUP.COLOR]: 'Color',
  [SCENE_GROUP.CUSTOM]: 'My scenes',
};
