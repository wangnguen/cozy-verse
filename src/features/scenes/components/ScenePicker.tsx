import { useState } from 'react';
import { cn } from 'cn';
import { Search } from 'lucide-react';

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
  const favoriteSceneIds = useSceneStore((state) => state.favoriteSceneIds);
  const toggleFavorite = useSceneStore((state) => state.toggleFavorite);
  const [tab, setTab] = useState<Tab>('all');
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const visibleScenes = SCENES.filter((scene) => {
    const matchesTab = tab === 'all' || scene.group === tab;
    const matchesQuery = scene.name.toLowerCase().includes(normalizedQuery);
    return matchesTab && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-white/50"
        />
        <input
          type="search"
          placeholder="Search scenes..."
          value={query}
          aria-label="Search scenes"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/20 bg-transparent py-1 pr-2 pl-8 text-sm"
        />
      </div>
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
      {visibleScenes.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
          <img alt="" src="/illustrations/no-data.svg" className="w-32 opacity-80" />
          <p className="text-center text-sm text-white/50">No scenes found</p>
        </div>
      ) : (
        <div className="grid h-[60vh] scrollbar-glass grid-cols-2 content-start gap-2 overflow-y-auto p-1">
          {visibleScenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              active={currentSceneId === scene.id}
              onSelect={() => setCurrentSceneId(scene.id)}
              favorite={favoriteSceneIds.includes(scene.id)}
              onToggleFavorite={() => toggleFavorite(scene.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
