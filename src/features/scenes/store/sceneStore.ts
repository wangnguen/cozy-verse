import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_SCENE_ID } from '../catalog';

type SceneState = {
  currentSceneId: string;
  favoriteSceneIds: string[];
  setCurrentSceneId: (sceneId: string) => void;
  toggleFavorite: (sceneId: string) => void;
};

export const useSceneStore = create<SceneState>()(
  persist(
    (set) => ({
      currentSceneId: DEFAULT_SCENE_ID,
      favoriteSceneIds: [],
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
    }),
    { name: 'cozyverse:scene', version: 1 },
  ),
);
