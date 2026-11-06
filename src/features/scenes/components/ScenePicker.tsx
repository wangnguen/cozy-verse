import { useState } from 'react';
import { cn } from 'cn';
import { Search } from 'lucide-react';

import { SCENE_GROUP } from '@/shared/constants/scene';

import { SCENE_GROUPS, SCENES } from '../catalog';
import { EMPTY_SCENES_MESSAGE } from '../constants/messages';
import { SCENE_TAB, SCENE_TAB_LABELS } from '../constants/tabs';
import { useSceneStore } from '../store/sceneStore';
import type { SceneTab } from '../types';
import { AddSceneForm } from './AddSceneForm';
import { SceneCard } from './SceneCard';

const TABS: SceneTab[] = [SCENE_TAB.ALL, SCENE_TAB.FAVORITES, SCENE_GROUP.CUSTOM, ...SCENE_GROUPS];

export const ScenePicker = () => {
  const currentSceneId = useSceneStore((state) => state.currentSceneId);
  const setCurrentSceneId = useSceneStore((state) => state.setCurrentSceneId);
  const favoriteSceneIds = useSceneStore((state) => state.favoriteSceneIds);
  const toggleFavorite = useSceneStore((state) => state.toggleFavorite);
  const customScenes = useSceneStore((state) => state.customScenes);
  const addCustomScene = useSceneStore((state) => state.addCustomScene);
  const removeCustomScene = useSceneStore((state) => state.removeCustomScene);
  const [tab, setTab] = useState<SceneTab>(SCENE_TAB.ALL);
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const emptyMessage =
    tab === SCENE_TAB.FAVORITES && favoriteSceneIds.length === 0
      ? EMPTY_SCENES_MESSAGE.FAVORITES
      : tab === SCENE_GROUP.CUSTOM && customScenes.length === 0
        ? EMPTY_SCENES_MESSAGE.CUSTOM
        : EMPTY_SCENES_MESSAGE.DEFAULT;

  const visibleScenes = [...customScenes, ...SCENES].filter((scene) => {
    const matchesTab =
      tab === SCENE_TAB.ALL ||
      (tab === SCENE_TAB.FAVORITES ? favoriteSceneIds.includes(scene.id) : scene.group === tab);
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
      <AddSceneForm
        onAdd={(source) => {
          setCurrentSceneId(addCustomScene(source));
          setTab(SCENE_GROUP.CUSTOM);
          setQuery('');
        }}
      />
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
            {SCENE_TAB_LABELS[item]}
          </button>
        ))}
      </div>
      {visibleScenes.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
          <img alt="" src="/illustrations/no-data.svg" className="w-32 opacity-80" />
          <p className="text-center text-sm text-white/50">{emptyMessage}</p>
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
              onRemove={
                scene.group === SCENE_GROUP.CUSTOM ? () => removeCustomScene(scene.id) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
