import type { ReactNode } from 'react';
import { cn } from 'cn';
import { X } from 'lucide-react';

import { GlassSurface } from '@/components/ui/GlassSurface';

export type WidgetSize = 'sm' | 'lg';

const SIZE_CLASSES: Record<WidgetSize, string> = {
  sm: 'w-80',
  lg: 'w-[36rem] max-w-[calc(100vw-2rem)]',
};

export const Widget = ({
  title,
  size = 'sm',
  onClose,
  children,
}: {
  title: string;
  size?: WidgetSize;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <GlassSurface level="regular" className={cn('p-4', SIZE_CLASSES[size])}>
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
      {children}
    </GlassSurface>
  );
};
