import type { Scene } from '@/shared/types/scene';

import type { ParsedSceneUrl } from './parseSceneUrl';

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

const sceneName = (parsed: ParsedSceneUrl) => {
  if (parsed.kind === 'youtube') return 'YouTube video';
  return fileName(parsed.src) || (parsed.kind === 'image' ? 'Image' : 'Video');
};

export const sourceKey = (scene: Scene | ParsedSceneUrl): string | undefined => {
  switch (scene.kind) {
    case 'youtube':
      return `youtube:${scene.videoId}`;
    case 'image':
    case 'video':
      return `${scene.kind}:${scene.src}`;
    default:
      return undefined;
  }
};

export const createCustomScene = (parsed: ParsedSceneUrl, id: string): Scene => ({
  ...parsed,
  id,
  name: sceneName(parsed),
  group: 'custom',
});
