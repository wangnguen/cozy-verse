import type { ReactNode } from 'react';
import { X } from 'lucide-react';

import { GlassSurface } from '@/components/ui/GlassSurface';

export const BottomSheet = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <GlassSurface
      level="thick"
      className="w-full animate-in p-4 pt-2 duration-300 slide-in-from-bottom"
    >
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30" />
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="rounded-full p-1 hover:bg-white/10"
        >
          <X className="size-4" />
        </button>
      </div>
      <div>{children}</div>
    </GlassSurface>
  );
};
