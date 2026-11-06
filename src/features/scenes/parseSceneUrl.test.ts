import { describe, expect, it } from 'vitest';

import { parseSceneUrl } from './parseSceneUrl';

const ID = 'dQw4w9WgXcQ';

describe('parseSceneUrl', () => {
  describe('youtube', () => {
    it.each([
      `https://www.youtube.com/watch?v=${ID}`,
      `https://www.youtube.com/watch?v=${ID}&t=30s`,
      `https://m.youtube.com/watch?v=${ID}`,
      `https://youtu.be/${ID}`,
      `https://youtu.be/${ID}?si=abc`,
      `https://youtube.com/shorts/${ID}`,
      `https://www.youtube.com/embed/${ID}`,
      `  HTTPS://WWW.YOUTUBE.COM/watch?v=${ID}  `,
    ])('parses %s', (input) => {
      expect(parseSceneUrl(input)).toEqual({ kind: 'youtube', videoId: ID });
    });

    it.each([
      'https://youtu.be/abc',
      'https://youtu.be/',
      'https://www.youtube.com/watch',
      'https://www.youtube.com/watch?v=',
      'https://www.youtube.com/shorts/',
      'https://www.youtube.com/@channel',
      'https://www.youtube.com/thumb.jpg',
    ])('rejects %s', (input) => {
      expect(parseSceneUrl(input)).toBeNull();
    });
  });

  describe('image', () => {
    it.each([
      'https://example.com/room.jpg',
      'https://example.com/room.jpeg',
      'https://example.com/room.PNG',
      'https://example.com/room.webp',
      'https://example.com/room.gif',
      'https://example.com/room.avif',
    ])('parses %s', (input) => {
      expect(parseSceneUrl(input)).toEqual({ kind: 'image', src: input });
    });

    it('ignores the query string when reading the extension', () => {
      const input = 'https://example.com/room.jpg?w=1920';
      expect(parseSceneUrl(input)).toEqual({ kind: 'image', src: input });
    });
  });

  describe('video', () => {
    it.each(['https://example.com/rain.mp4', 'https://example.com/rain.webm'])(
      'parses %s',
      (input) => {
        expect(parseSceneUrl(input)).toEqual({ kind: 'video', src: input });
      },
    );

    it.each(['https://example.com/rain.ogg', 'https://example.com/rain.mov'])(
      'rejects %s',
      (input) => {
        expect(parseSceneUrl(input)).toBeNull();
      },
    );
  });

  it.each([
    '',
    'hello',
    'example.com/room.jpg',
    'javascript:alert(1)',
    'ftp://example.com/room.jpg',
    'data:image/png;base64,AAAA',
    'https://example.com/page',
    'https://example.com/room.jpg.html',
  ])('returns null for %j', (input) => {
    expect(parseSceneUrl(input)).toBeNull();
  });
});
