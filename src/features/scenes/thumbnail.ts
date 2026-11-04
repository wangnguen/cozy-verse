import type { Scene } from '@/shared/types/scene';

const youtubeThumbnail = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

export const getSceneThumbnail = (scene: Scene): string | undefined => {
  switch (scene.kind) {
    case 'image':
      return scene.thumbnail ?? scene.src;
    case 'video':
      return scene.poster;
    case 'youtube':
      return youtubeThumbnail(scene.videoId);
    case 'color':
    case 'gradient':
      return undefined;
  }
};
