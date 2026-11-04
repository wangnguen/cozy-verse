import { describe, expect, it } from 'vitest';

import type { Scene } from '@/shared/types/scene';

import { getSceneThumbnail } from './thumbnail';

const base = { id: 'test', name: 'Test', group: 'anime' } as const;

describe('getSceneThumbnail', () => {
  it('uses the pre-made thumbnail of a catalog image', () => {
    const scene: Scene = {
      ...base,
      kind: 'image',
      src: '/scenes/a.jpg',
      thumbnail: '/scenes/thumbnails/a.jpg',
    };
    expect(getSceneThumbnail(scene)).toBe('/scenes/thumbnails/a.jpg');
  });

  it.each([
    ['uploaded image', 'blob:http://localhost:4000/1b2c'],
    ['linked image', 'https://example.com/room.jpg'],
    ['GIF', '/scenes/rain.gif'],
  ])('falls back to src for an %s', (_label, src) => {
    const scene: Scene = { ...base, kind: 'image', src };
    expect(getSceneThumbnail(scene)).toBe(src);
  });

  it('uses the poster of a video', () => {
    const scene: Scene = { ...base, kind: 'video', src: '/scenes/a.mp4', poster: '/scenes/a.jpg' };
    expect(getSceneThumbnail(scene)).toBe('/scenes/a.jpg');
  });

  it('builds the YouTube thumbnail from the video id', () => {
    const scene: Scene = { ...base, kind: 'youtube', videoId: 'jfKfPfyJRdk' };
    expect(getSceneThumbnail(scene)).toBe('https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg');
  });

  it('returns undefined for scenes drawn with CSS', () => {
    expect(getSceneThumbnail({ ...base, kind: 'color', color: '#000' })).toBeUndefined();
    expect(getSceneThumbnail({ ...base, kind: 'gradient', gradient: 'none' })).toBeUndefined();
  });
});
