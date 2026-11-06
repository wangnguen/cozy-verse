import type { ValueOf } from '@/shared/types/utils';

export const ALLOWED_PROTOCOLS = ['http:', 'https:'];

export const IMAGE_EXT_PATTERN = /\.(jpe?g|png|gif|webp|avif)$/i;
export const VIDEO_EXT_PATTERN = /\.(mp4|webm)$/i;

export const YOUTUBE_SHORT_HOST = 'youtu.be';
export const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com'];
export const YOUTUBE_EMBED_HOST = 'https://www.youtube-nocookie.com';
export const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
export const YOUTUBE_VIDEO_PARAM = 'v';

export const YOUTUBE_PATH = {
  WATCH: '/watch',
  SHORTS: '/shorts/',
  EMBED: '/embed/',
} as const;

export const YOUTUBE_THUMBNAIL = {
  HIGH: 'hqdefault',
  MAX: 'maxresdefault',
} as const;

export const youtubeThumbnailUrl = (videoId: string, quality: ValueOf<typeof YOUTUBE_THUMBNAIL>) =>
  `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
