import { useSyncExternalStore } from 'react';

import { APP_EVENT } from '@/shared/constants/app';

import { WIDGETS, type WidgetId } from './widgets';

const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  // pushState/replaceState do not fire popstate, so tell subscribers about our own changes
  window.addEventListener(APP_EVENT.URL_CHANGE, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(APP_EVENT.URL_CHANGE, onChange);
  };
};

const getPanelParam = () => new URLSearchParams(window.location.search).get('panel');

const navigate = (url: string, mode: 'push' | 'replace') => {
  if (mode === 'push') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(APP_EVENT.URL_CHANGE));
};

// The open widget lives in the URL (?panel=timer), so Back closes it instead of leaving the page
export const usePanel = () => {
  const raw = useSyncExternalStore(subscribe, getPanelParam);

  // Ignore unknown values like ?panel=abc
  const panel: WidgetId | null = WIDGETS.find((w) => w.id === raw)?.id ?? null;

  const open = (id: WidgetId) => navigate(`?panel=${id}`, 'push');
  const close = () => navigate(window.location.pathname, 'replace');
  const toggle = (id: WidgetId) => (panel === id ? close() : open(id));

  return { panel, open, close, toggle };
};
