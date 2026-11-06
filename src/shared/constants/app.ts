const APP_PREFIX = 'cozyverse';

export const STORAGE_KEY = {
  SCENE_STORE: `${APP_PREFIX}:scene`,
} as const;

export const youtubePositionStorageKey = (videoId: string) =>
  `${APP_PREFIX}:yt-position:${videoId}`;

export const APP_EVENT = {
  URL_CHANGE: `${APP_PREFIX}:urlchange`,
} as const;
