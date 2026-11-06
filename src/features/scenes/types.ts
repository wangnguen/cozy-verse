import type { SceneGroup } from '@/shared/types/scene';
import type { ValueOf } from '@/shared/types/utils';

import type { SCENE_TAB } from './constants/tabs';

export type SceneTab = ValueOf<typeof SCENE_TAB> | SceneGroup;
