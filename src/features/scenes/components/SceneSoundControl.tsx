import { cn } from 'cn';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';

import { Slider } from '@/components/ui/Slider';
import { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneKind } from '@/shared/types/scene';

import { getSceneById } from '../catalog';
import { SCENE_SOUND_LABEL } from '../constants/messages';
import { MAX_SOUND_VOLUME, MIN_SOUND_VOLUME } from '../constants/scene';
import { useSceneStore } from '../store/sceneStore';

const SCENE_KINDS_WITH_SOUND: ReadonlySet<SceneKind> = new Set([
  SCENE_KIND.VIDEO,
  SCENE_KIND.YOUTUBE,
]);

const VolumeIcon = ({ soundOn, volume }: { soundOn: boolean; volume: number }) => {
  const className = 'size-4';
  if (!soundOn) return <VolumeX className={className} />;
  if (volume === MIN_SOUND_VOLUME) return <Volume className={className} />;
  if (volume < MAX_SOUND_VOLUME / 2) return <Volume1 className={className} />;
  return <Volume2 className={className} />;
};

export const SceneSoundControl = () => {
  const currentSceneId = useSceneStore((state) => state.currentSceneId);
  const customScenes = useSceneStore((state) => state.customScenes);
  const soundOn = useSceneStore((state) => state.soundOn);
  const volume = useSceneStore((state) => state.volume);
  const toggleSound = useSceneStore((state) => state.toggleSound);
  const setVolume = useSceneStore((state) => state.setVolume);

  const scene = getSceneById(currentSceneId, customScenes);
  if (!SCENE_KINDS_WITH_SOUND.has(scene.kind)) return null;

  return (
    <div
      className={cn(
        'flex items-center rounded-full transition-colors duration-300',
        soundOn && 'bg-white/10',
      )}
    >
      <button
        type="button"
        aria-label={soundOn ? SCENE_SOUND_LABEL.MUTE : SCENE_SOUND_LABEL.UNMUTE}
        aria-pressed={soundOn}
        onClick={toggleSound}
        className={cn(
          'rounded-full p-1.5 transition-colors hover:bg-white/15',
          soundOn ? 'text-white' : 'text-white/60 hover:text-white',
        )}
      >
        <VolumeIcon soundOn={soundOn} volume={volume} />
      </button>
      <div
        inert={!soundOn}
        className={cn(
          'overflow-hidden transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none',
          soundOn ? 'w-28 opacity-100' : 'w-0 opacity-0',
        )}
      >
        <div className="flex items-center gap-2 pr-3 pl-1">
          <Slider
            min={MIN_SOUND_VOLUME}
            max={MAX_SOUND_VOLUME}
            value={[volume]}
            onValueChange={([value]) => setVolume(value)}
            aria-label={SCENE_SOUND_LABEL.VOLUME}
          />
          <span className="w-6 text-right text-xs text-white/70 tabular-nums">{volume}</span>
        </div>
      </div>
    </div>
  );
};
