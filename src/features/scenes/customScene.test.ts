import { describe, expect, it } from 'vitest';

import { getSceneById } from './catalog';
import { DEFAULT_SCENE_ID } from './constants/scene';
import { createCustomScene, sourceKey } from './customScene';

describe('createCustomScene', () => {
  it('builds a youtube scene in the custom group', () => {
    expect(createCustomScene({ kind: 'youtube', videoId: 'dQw4w9WgXcQ' }, 'c1')).toEqual({
      id: 'c1',
      name: 'YouTube video',
      group: 'custom',
      kind: 'youtube',
      videoId: 'dQw4w9WgXcQ',
    });
  });

  it('names image and video scenes after the file', () => {
    const image = createCustomScene(
      { kind: 'image', src: 'https://example.com/a/rainy_night-cafe.jpg?w=800' },
      'c1',
    );
    const video = createCustomScene(
      { kind: 'video', src: 'https://example.com/Lo%20Fi.mp4' },
      'c2',
    );
    expect(image.name).toBe('rainy night cafe');
    expect(video.name).toBe('Lo Fi');
  });

  it('falls back to the kind when the file name is empty', () => {
    expect(createCustomScene({ kind: 'image', src: 'https://example.com/.png' }, 'c1').name).toBe(
      'Image',
    );
  });

  it('keeps a malformed escape as is', () => {
    expect(
      createCustomScene({ kind: 'video', src: 'https://example.com/50%.mp4' }, 'c1').name,
    ).toBe('50%');
  });
});

describe('sourceKey', () => {
  it('matches a parsed link with the scene built from it', () => {
    const parsed = { kind: 'image', src: 'https://example.com/a.jpg' } as const;
    expect(sourceKey(createCustomScene(parsed, 'c1'))).toBe(sourceKey(parsed));
  });

  it('has no key for color and gradient scenes', () => {
    expect(sourceKey({ id: 'x', name: 'x', group: 'color', kind: 'color', color: '#000' })).toBe(
      undefined,
    );
  });
});

describe('getSceneById', () => {
  it('finds a custom scene', () => {
    const scene = createCustomScene({ kind: 'youtube', videoId: 'dQw4w9WgXcQ' }, 'c1');
    expect(getSceneById('c1', [scene])).toBe(scene);
  });

  it('falls back to the default scene for an unknown id', () => {
    expect(getSceneById('missing').id).toBe(DEFAULT_SCENE_ID);
  });
});
