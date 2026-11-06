import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Scene } from '@/shared/types/scene';

import { DEFAULT_SCENE_ID } from '../catalog';
import { createCustomScene, sourceKey } from '../customScene';
import type { ParsedSceneUrl } from '../parseSceneUrl';

type SceneState = {
  currentSceneId: string;
  favoriteSceneIds: string[];
  customScenes: Scene[];
  setCurrentSceneId: (sceneId: string) => void;
  toggleFavorite: (sceneId: string) => void;
  addCustomScene: (parsed: ParsedSceneUrl) => string;
  removeCustomScene: (sceneId: string) => void;
};

export const useSceneStore = create<SceneState>()(
  persist(
    (set, get) => ({
      currentSceneId: DEFAULT_SCENE_ID,
      favoriteSceneIds: [],
      customScenes: [],
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
      addCustomScene: (parsed) => {
        const key = sourceKey(parsed);
        const existing = get().customScenes.find((scene) => sourceKey(scene) === key);
        if (existing) return existing.id;

        const scene = createCustomScene(parsed, `custom-${crypto.randomUUID()}`);
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
    }),
    { name: 'cozyverse:scene', version: 1 },
  ),
);
