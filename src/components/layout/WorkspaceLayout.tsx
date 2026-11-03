import type { ReactNode } from 'react';
import { cn } from 'cn';

export const WorkspaceLayout = ({
  scene,
  topBar,
  dock,
  children,
  zen,
}: {
  scene: ReactNode;
  topBar: ReactNode;
  dock: ReactNode;
  children: ReactNode;
  zen: boolean;
}) => {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <div className="absolute inset-0 z-0">{scene}</div>
      <div className="relative z-10 flex h-full flex-col">
        <div inert={zen} className={cn('transition-opacity duration-500', zen && 'opacity-0')}>
          {topBar}
        </div>
        <div className="flex-1">{children}</div>
        <div
          inert={zen}
          className={cn(
            'flex justify-center px-2 pb-2 transition-opacity duration-500 md:px-0 md:pb-4',
            zen && 'opacity-0',
          )}
        >
          {dock}
        </div>
      </div>
    </div>
  );
};
