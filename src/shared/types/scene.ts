import type { IMAGE_FIT, SCENE_GROUP, SCENE_KIND } from '@/shared/constants/scene';

import type { ValueOf } from './utils';

export type SceneKind = ValueOf<typeof SCENE_KIND>;
export type SceneGroup = ValueOf<typeof SCENE_GROUP>;
export type ImageFit = ValueOf<typeof IMAGE_FIT>;

type SceneBase = {
  id: string;
  name: string;
  group: SceneGroup;
};

export type YouTubeSource = { kind: typeof SCENE_KIND.YOUTUBE; videoId: string };
export type ImageSource = { kind: typeof SCENE_KIND.IMAGE; src: string };
export type VideoSource = { kind: typeof SCENE_KIND.VIDEO; src: string };
export type SceneSource = YouTubeSource | ImageSource | VideoSource;
export type SceneSourceKind = SceneSource['kind'];

export type Scene =
  | (SceneBase & { kind: typeof SCENE_KIND.COLOR; color: string })
  | (SceneBase & { kind: typeof SCENE_KIND.GRADIENT; gradient: string })
  | (SceneBase & ImageSource & { thumbnail?: string; focus?: string; fit?: ImageFit })
  | (SceneBase & VideoSource & { poster?: string; focus?: string })
  | (SceneBase & YouTubeSource);

export type SceneOfKind<K extends SceneKind> = Extract<Scene, { kind: K }>;
