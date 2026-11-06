import { SCENE_KIND } from '@/shared/constants/scene';
import type { Scene } from '@/shared/types/scene';

import { YOUTUBE_THUMBNAIL, youtubeThumbnailUrl } from './constants/url';

export const getSceneThumbnail = (scene: Scene): string | undefined => {
  switch (scene.kind) {
    case SCENE_KIND.IMAGE:
      return scene.thumbnail ?? scene.src;
    case SCENE_KIND.VIDEO:
      return scene.poster;
    case SCENE_KIND.YOUTUBE:
      return youtubeThumbnailUrl(scene.videoId, YOUTUBE_THUMBNAIL.HIGH);
    case SCENE_KIND.COLOR:
    case SCENE_KIND.GRADIENT:
      return undefined;
  }
};
