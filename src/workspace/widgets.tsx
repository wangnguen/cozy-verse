import type { ReactNode } from 'react';
import {
  AudioLines,
  ChartColumn,
  ImageIcon,
  ListTodo,
  Music,
  NotebookPen,
  Settings,
  Timer,
  type LucideIcon,
} from 'lucide-react';

import type { WidgetSize } from '@/components/ui/Widget';
import { ScenePicker } from '@/features/scenes';

export type WidgetDef = {
  id: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
  size?: WidgetSize;
};

export const WIDGETS = [
  { id: 'scenes', label: 'Scenes', icon: ImageIcon, content: <ScenePicker />, size: 'lg' },
  { id: 'timer', label: 'Timer', icon: Timer, content: <p>Coming soon</p> },
  { id: 'sounds', label: 'Sounds', icon: AudioLines, content: <p>Coming soon</p> },
  { id: 'music', label: 'Music', icon: Music, content: <p>Coming soon</p> },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, content: <p>Coming soon</p> },
  { id: 'notes', label: 'Notes', icon: NotebookPen, content: <p>Coming soon</p> },
  { id: 'stats', label: 'Stats', icon: ChartColumn, content: <p>Coming soon</p> },
  { id: 'settings', label: 'Settings', icon: Settings, content: <p>Coming soon</p> },
] as const satisfies readonly WidgetDef[];

export type WidgetId = (typeof WIDGETS)[number]['id'];
