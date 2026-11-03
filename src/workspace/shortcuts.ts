import { useEffect } from 'react';

import { useWorkspaceStore } from './workspaceStore';

export const useShortcuts = () => {
  const toggleZen = useWorkspaceStore((state) => state.toggleZen);
  const setZen = useWorkspaceStore((state) => state.setZen);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
        return;
      if (e.code === 'KeyZ') {
        toggleZen();
      }
      if (e.key === 'Escape') {
        setZen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleZen, setZen]);
};
