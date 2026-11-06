import { useId, useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

import type { SceneSource } from '@/shared/types/scene';

import { INVALID_SCENE_LINK_MESSAGE } from '../constants/messages';
import { parseSceneUrl } from '../parseSceneUrl';

type AddSceneFormProps = { onAdd: (source: SceneSource) => void };

export const AddSceneForm = ({ onAdd }: AddSceneFormProps) => {
  const [link, setLink] = useState('');
  const [invalid, setInvalid] = useState(false);
  const errorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const source = parseSceneUrl(link);
    if (!source) {
      setInvalid(true);
      return;
    }
    onAdd(source);
    setLink('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex gap-1">
        <input
          type="text"
          inputMode="url"
          placeholder="Paste a YouTube, image or video link"
          value={link}
          aria-label="Scene link"
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          onChange={(e) => {
            setLink(e.target.value);
            setInvalid(false);
          }}
          className="min-w-0 flex-1 rounded-md border border-white/20 bg-transparent px-2 py-1 text-sm aria-[invalid=true]:border-rose-400/70"
        />
        <button
          type="submit"
          disabled={!link.trim()}
          aria-label="Add scene"
          className="rounded-md border border-white/20 px-2 disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {invalid && (
        <p id={errorId} role="alert" className="text-xs text-rose-300">
          {INVALID_SCENE_LINK_MESSAGE}
        </p>
      )}
    </form>
  );
};
