import { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneSource } from '@/shared/types/scene';

import {
  ALLOWED_PROTOCOLS,
  IMAGE_EXT_PATTERN,
  VIDEO_EXT_PATTERN,
  YOUTUBE_HOSTS,
  YOUTUBE_ID_PATTERN,
  YOUTUBE_PATH,
  YOUTUBE_SHORT_HOST,
  YOUTUBE_VIDEO_PARAM,
} from './constants/url';

const toUrl = (input: string): URL | null => {
  try {
    return new URL(input);
  } catch {
    return null;
  }
};

const parseYouTubeId = (url: URL): string | null => {
  if (url.hostname === YOUTUBE_SHORT_HOST) return url.pathname.split('/')[1] ?? null;
  if (url.pathname === YOUTUBE_PATH.WATCH) return url.searchParams.get(YOUTUBE_VIDEO_PARAM);
  if (url.pathname.startsWith(YOUTUBE_PATH.SHORTS) || url.pathname.startsWith(YOUTUBE_PATH.EMBED)) {
    return url.pathname.split('/')[2] ?? null;
  }
  return null;
};

const isYouTubeHost = (url: URL) =>
  url.hostname === YOUTUBE_SHORT_HOST || YOUTUBE_HOSTS.includes(url.hostname);

export const parseSceneUrl = (input: string): SceneSource | null => {
  const url = toUrl(input);
  if (!url || !ALLOWED_PROTOCOLS.includes(url.protocol)) return null;

  if (isYouTubeHost(url)) {
    const videoId = parseYouTubeId(url);
    return videoId && YOUTUBE_ID_PATTERN.test(videoId)
      ? { kind: SCENE_KIND.YOUTUBE, videoId }
      : null;
  }

  if (IMAGE_EXT_PATTERN.test(url.pathname)) return { kind: SCENE_KIND.IMAGE, src: url.href };
  if (VIDEO_EXT_PATTERN.test(url.pathname)) return { kind: SCENE_KIND.VIDEO, src: url.href };

  return null;
};
