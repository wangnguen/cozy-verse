import { Eye } from 'lucide-react';

import { BottomSheet } from '@/components/layout/BottomSheet';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { Widget } from '@/components/ui/Widget';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import { Dock } from './Dock';
import { useShortcuts } from './shortcuts';
import { TopBar } from './TopBar';
import { usePanel } from './usePanel';
import { WIDGETS, type WidgetDef } from './widgets';
import { useWorkspaceStore } from './workspaceStore';

export const WorkspaceRoot = () => {
  const { panel, close } = usePanel();
  const zen = useWorkspaceStore((state) => state.zen);
  const setZen = useWorkspaceStore((state) => state.setZen);
  const isMobile = useMediaQuery('(max-width: 767px)');
  useShortcuts();

  const activeWidget: WidgetDef | undefined = WIDGETS.find((w) => w.id === panel);

  return (
    <WorkspaceLayout
      zen={zen}
      scene={<div className="size-full bg-[url(/scenes/test-light.jpg)] bg-cover bg-center" />}
      topBar={<TopBar />}
      dock={<Dock />}
    >
      <div className="flex h-full items-end p-2 md:items-center md:justify-center md:p-4">
        {!zen &&
          activeWidget &&
          (isMobile ? (
            <BottomSheet title={activeWidget.label} onClose={close}>
              {activeWidget.content}
            </BottomSheet>
          ) : (
            <Widget title={activeWidget.label} size={activeWidget.size} onClose={close}>
              {activeWidget.content}
            </Widget>
          ))}
        {zen && (
          <button
            type="button"
            aria-label="Exit zen mode"
            onClick={() => setZen(false)}
            className="fixed right-4 bottom-4 rounded-full p-2 text-white opacity-30 transition-opacity hover:opacity-100"
          >
            <Eye className="size-5" />
          </button>
        )}
      </div>
    </WorkspaceLayout>
  );
};
