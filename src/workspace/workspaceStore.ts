import { create } from 'zustand';

type WorkspaceState = {
  zen: boolean;
  toggleZen: () => void;
  setZen: (zen: boolean) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()((set) => ({
  zen: false,
  toggleZen: () => set((state) => ({ zen: !state.zen })),
  setZen: (zen) => set({ zen }),
}));
