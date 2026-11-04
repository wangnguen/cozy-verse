import { useState } from 'react';
import { cn } from 'cn';

import type { SceneGroup } from '@/shared/types/scene';

import { GROUP_LABELS, SCENE_GROUPS, SCENES } from '../catalog';
import { useSceneStore } from '../store/sceneStore';
import { SceneCard } from './SceneCard';

type Tab = SceneGroup | 'all';

const TABS: Tab[] = ['all', ...SCENE_GROUPS];

const tabLabel = (tab: Tab) => (tab === 'all' ? 'All' : GROUP_LABELS[tab]);

export const ScenePicker = () => {
  const currentSceneId = useSceneStore((state) => state.currentSceneId);
  const setCurrentSceneId = useSceneStore((state) => state.setCurrentSceneId);
  const [tab, setTab] = useState<Tab>('all');

  const visibleScenes = tab === 'all' ? SCENES : SCENES.filter((scene) => scene.group === tab);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex scrollbar-glass gap-1 overflow-x-auto pb-1">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              'shrink-0 rounded-full px-3 py-1 text-sm whitespace-nowrap hover:bg-white/10 focus-visible:ring',
              tab === item && 'bg-white/20',
            )}
            aria-pressed={tab === item}
            onClick={(e) => {
              setTab(item);
              e.currentTarget.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
              });
            }}
          >
            {tabLabel(item)}
          </button>
        ))}
      </div>
      <div className="grid h-[60vh] scrollbar-glass grid-cols-2 content-start gap-2 overflow-y-auto p-1">
        {visibleScenes.map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            active={currentSceneId === scene.id}
            onSelect={() => setCurrentSceneId(scene.id)}
          />
        ))}
      </div>
    </div>
  );
};
