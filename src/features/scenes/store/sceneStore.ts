import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STORAGE_KEY } from '@/shared/constants/app';
import type { Scene, SceneSource } from '@/shared/types/scene';

import {
  CUSTOM_SCENE_ID_PREFIX,
  DEFAULT_SCENE_ID,
  DEFAULT_SOUND_VOLUME,
  MAX_SOUND_VOLUME,
  MIN_SOUND_VOLUME,
} from '../constants/scene';
import { createCustomScene, sourceKey } from '../customScene';

type SceneState = {
  currentSceneId: string;
  favoriteSceneIds: string[];
  customScenes: Scene[];
  soundOn: boolean;
  volume: number;
  setCurrentSceneId: (sceneId: string) => void;
  toggleFavorite: (sceneId: string) => void;
  addCustomScene: (source: SceneSource) => string;
  removeCustomScene: (sceneId: string) => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
};

export const useSceneStore = create<SceneState>()(
  persist(
    (set, get) => ({
      currentSceneId: DEFAULT_SCENE_ID,
      favoriteSceneIds: [],
      customScenes: [],
      soundOn: false,
      volume: DEFAULT_SOUND_VOLUME,
      setCurrentSceneId: (sceneId) => set({ currentSceneId: sceneId }),
      toggleFavorite: (sceneId) =>
        set((state) => {
          const isFavorite = state.favoriteSceneIds.includes(sceneId);
          return {
            favoriteSceneIds: isFavorite
              ? state.favoriteSceneIds.filter((id) => id !== sceneId)
              : [...state.favoriteSceneIds, sceneId],
          };
        }),
      addCustomScene: (source) => {
        const key = sourceKey(source);
        const existing = get().customScenes.find((scene) => sourceKey(scene) === key);
        if (existing) return existing.id;

        const scene = createCustomScene(source, `${CUSTOM_SCENE_ID_PREFIX}${crypto.randomUUID()}`);
        set((state) => ({ customScenes: [scene, ...state.customScenes] }));
        return scene.id;
      },
      removeCustomScene: (sceneId) =>
        set((state) => ({
          customScenes: state.customScenes.filter((scene) => scene.id !== sceneId),
          favoriteSceneIds: state.favoriteSceneIds.filter((id) => id !== sceneId),
          currentSceneId:
            state.currentSceneId === sceneId ? DEFAULT_SCENE_ID : state.currentSceneId,
        })),
      toggleSound: () => set((state) => ({ soundOn: !state.soundOn })),
      setVolume: (volume) =>
        set({ volume: Math.min(MAX_SOUND_VOLUME, Math.max(MIN_SOUND_VOLUME, volume)) }),
    }),
    {
      name: STORAGE_KEY.SCENE_STORE,
      version: 1,
      partialize: ({ currentSceneId, favoriteSceneIds, customScenes, volume }) => ({
        currentSceneId,
        favoriteSceneIds,
        customScenes,
        volume,
      }),
    },
  ),
);
