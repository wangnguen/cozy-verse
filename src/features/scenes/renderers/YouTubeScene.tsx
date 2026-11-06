import { useEffect, useRef, useState } from 'react';
import { cn } from 'cn';

import { youtubePositionStorageKey } from '@/shared/constants/app';
import type { SCENE_KIND } from '@/shared/constants/scene';
import type { SceneOfKind } from '@/shared/types/scene';
import { loadYouTubeApi } from '@/shared/youtube/loadYouTubeApi';
import { PlayerState, type Player } from '@/shared/youtube/types';

import { YOUTUBE_EMBED_HOST, YOUTUBE_THUMBNAIL, youtubeThumbnailUrl } from '../constants/url';
import { getSceneThumbnail } from '../thumbnail';

type YouTubeSceneProps = { scene: SceneOfKind<typeof SCENE_KIND.YOUTUBE> };

const PLAYER_VARS = {
  autoplay: 1,
  mute: 1,
  controls: 0,
  rel: 0,
  playsinline: 1,
  disablekb: 1,
  iv_load_policy: 3,
};

const REVEAL_DELAY_MS = 500;

export const YouTubeScene = ({ scene }: YouTubeSceneProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [maxresMissing, setMaxresMissing] = useState(false);
  const { videoId, name } = scene;

  useEffect(() => {
    let cancelled = false;
    let player: Player | undefined;
    let revealTimer: number | undefined;

    const cover = () => {
      window.clearTimeout(revealTimer);
      setPlaying(false);
    };
    const revealSoon = () => {
      window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(() => setPlaying(true), REVEAL_DELAY_MS);
    };

    const savePosition = () => {
      try {
        if (!player) return;
        const currentTime = Math.floor(player.getCurrentTime());
        if (currentTime > 0)
          localStorage.setItem(youtubePositionStorageKey(videoId), String(currentTime));
      } catch (e) {
        console.error('Error saving position', e);
      }
    };

    const readPosition = () => {
      try {
        const seconds = Number(localStorage.getItem(youtubePositionStorageKey(videoId)));
        return Number.isFinite(seconds) ? seconds : 0;
      } catch (e) {
        console.error('Error reading position', e);
        return 0;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) cover();
      else if (player && player.getPlayerState() !== PlayerState.Playing) player.playVideo();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', savePosition);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return;
        player = new YT.Player(hostRef.current, {
          videoId,
          host: YOUTUBE_EMBED_HOST,
          playerVars: { ...PLAYER_VARS, start: readPosition() },
          events: {
            onReady: ({ target }) => {
              const iframe = target.getIframe();
              iframe.tabIndex = -1;
              iframe.title = name;
              iframe.setAttribute('aria-hidden', 'true');
              target.mute();
              if (target.getPlayerState() !== PlayerState.Playing) target.playVideo();
            },
            onStateChange: ({ data, target }) => {
              if (data === PlayerState.Playing && !document.hidden) {
                target.unloadModule?.('captions');
                revealSoon();
              } else {
                cover();
              }
              if (data === PlayerState.Ended) {
                target.seekTo(0, true);
                target.playVideo();
              }
            },
            onError: cover,
          },
        });
      })
      .catch(cover);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', savePosition);
      window.clearTimeout(revealTimer);
      savePosition();
      player?.destroy();
      setPlaying(false);
    };
  }, [videoId, name]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-1/2 [&>iframe]:size-full">
        <div ref={hostRef} />
      </div>
      <img
        src={
          maxresMissing
            ? getSceneThumbnail(scene)
            : youtubeThumbnailUrl(videoId, YOUTUBE_THUMBNAIL.MAX)
        }
        onLoad={(event) => {
          if (event.currentTarget.naturalWidth <= 120) setMaxresMissing(true);
        }}
        onError={() => setMaxresMissing(true)}
        alt=""
        className={cn(
          'absolute inset-0 size-full object-cover',
          playing ? 'opacity-0 transition-opacity duration-700' : 'opacity-100',
        )}
      />
    </div>
  );
};
