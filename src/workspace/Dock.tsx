import { cn } from 'cn';

import { GlassSurface } from '@/components/ui/GlassSurface';

import { usePanel } from './usePanel';
import { WIDGETS } from './widgets';

export const Dock = () => {
  const { panel, toggle } = usePanel();
  return (
    <GlassSurface
      level="thin"
      className="flex w-full justify-between p-1 md:w-auto md:gap-1 md:p-2"
    >
      {WIDGETS.map((widget) => {
        const Icon = widget.icon;
        return (
          <button
            type="button"
            key={widget.id}
            aria-label={widget.label}
            title={widget.label}
            aria-pressed={panel === widget.id}
            onClick={() => toggle(widget.id)}
            className={cn(
              'flex items-center justify-center rounded-2xl p-2.5 hover:bg-white/10 md:p-3',
              panel === widget.id && 'bg-white/20',
            )}
          >
            <Icon className="size-5" />
          </button>
        );
      })}
    </GlassSurface>
  );
};
