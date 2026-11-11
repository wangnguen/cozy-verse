import { useEffect, useRef } from 'react';

import type { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneOfKind } from '@/shared/types/scene';

import { MAX_SOUND_VOLUME } from '../constants/scene';
import { useSceneStore } from '../store/sceneStore';

type VideoSceneProps = { scene: SceneOfKind<typeof SCENE_KIND.VIDEO> };

export const VideoScene = ({ scene }: VideoSceneProps) => {
  const soundOn = useSceneStore((state) => state.soundOn);
  const volume = useSceneStore((state) => state.volume);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume / MAX_SOUND_VOLUME;
  }, [volume]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 size-full object-cover"
      src={scene.src}
      poster={scene.poster}
      style={{ objectPosition: scene.focus }}
      autoPlay
      loop
      muted={!soundOn}
      playsInline
    />
  );
};
