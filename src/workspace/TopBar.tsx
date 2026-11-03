import { EyeOff } from 'lucide-react';

import { GlassSurface } from '@/components/ui/GlassSurface';

import { useWorkspaceStore } from './workspaceStore';

export const TopBar = () => {
  const toggleZen = useWorkspaceStore((state) => state.toggleZen);
  return (
    <GlassSurface
      level="thin"
      className="mx-2 mt-2 flex h-12 items-center justify-between px-4 md:mx-4 md:mt-4"
    >
      <div className="flex items-center gap-2">
        <img src="/brand/cozyverse-mark.png" alt="" width={32} height={32} className="size-8" />
        <span>CozyVerse</span>
      </div>
      <button
        type="button"
        aria-label="Zen mode"
        onClick={toggleZen}
        className="rounded-full p-1 hover:bg-white/10"
      >
        <EyeOff className="size-4" />
      </button>
    </GlassSurface>
  );
};
