import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_SCENE_ID } from '../catalog';

type SceneState = {
  currentSceneId: string;
  setCurrentSceneId: (sceneId: string) => void;
};

export const useSceneStore = create<SceneState>()(
  persist(
    (set) => ({
      currentSceneId: DEFAULT_SCENE_ID,
      setCurrentSceneId: (sceneId) => set({ currentSceneId: sceneId }),
    }),
    { name: 'cozyverse:scene', version: 1 },
  ),
);
