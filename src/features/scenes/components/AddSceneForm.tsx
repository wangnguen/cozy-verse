import { useId, useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

import { parseSceneUrl, type ParsedSceneUrl } from '../parseSceneUrl';

export const AddSceneForm = ({ onAdd }: { onAdd: (parsed: ParsedSceneUrl) => void }) => {
  const [link, setLink] = useState('');
  const [invalid, setInvalid] = useState(false);
  const errorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseSceneUrl(link);
    if (!parsed) {
      setInvalid(true);
      return;
    }
    onAdd(parsed);
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
          Use a YouTube link or a direct .jpg, .png, .webp, .gif, .avif, .mp4 or .webm link
        </p>
      )}
    </form>
  );
};
