export type ParsedSceneUrl =
  | { kind: 'youtube'; videoId: string }
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string };

const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com'];
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm)$/i;

const toUrl = (input: string): URL | null => {
  try {
    return new URL(input);
  } catch {
    return null;
  }
};

const parseYouTubeId = (url: URL): string | null => {
  if (url.hostname === 'youtu.be') return url.pathname.split('/')[1] ?? null;
  if (url.pathname === '/watch') return url.searchParams.get('v');
  if (url.pathname.startsWith('/shorts/') || url.pathname.startsWith('/embed/')) {
    return url.pathname.split('/')[2] ?? null;
  }
  return null;
};

const isYouTubeHost = (url: URL) =>
  url.hostname === 'youtu.be' || YOUTUBE_HOSTS.includes(url.hostname);

export const parseSceneUrl = (input: string): ParsedSceneUrl | null => {
  const url = toUrl(input);
  if (!url || !['http:', 'https:'].includes(url.protocol)) return null;

  if (isYouTubeHost(url)) {
    const videoId = parseYouTubeId(url);
    return videoId && YOUTUBE_ID.test(videoId) ? { kind: 'youtube', videoId } : null;
  }

  if (IMAGE_EXT.test(url.pathname)) return { kind: 'image', src: url.href };
  if (VIDEO_EXT.test(url.pathname)) return { kind: 'video', src: url.href };

  return null;
};
