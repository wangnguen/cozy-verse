export type SceneGroup =
  'anime' | 'cafe' | 'nature' | 'city' | 'library' | 'study-with-me' | 'gradient' | 'color';

type SceneBase = {
  id: string;
  name: string;
  group: SceneGroup;
};

export type Scene =
  | (SceneBase & { kind: 'color'; color: string })
  | (SceneBase & { kind: 'gradient'; gradient: string })
  | (SceneBase & {
      kind: 'image';
      src: string;
      thumbnail?: string;
      focus?: string;
      fit?: 'cover' | 'contain';
    })
  | (SceneBase & { kind: 'video'; src: string; poster: string; focus?: string })
  | (SceneBase & { kind: 'youtube'; videoId: string });
