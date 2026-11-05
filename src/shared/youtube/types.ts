export const PlayerState = {
  Unstarted: -1,
  Ended: 0,
  Playing: 1,
  Paused: 2,
  Buffering: 3,
  Cued: 5,
} as const;

export type PlayerStateValue = (typeof PlayerState)[keyof typeof PlayerState];

export type Player = {
  playVideo: () => void;
  getPlayerState: () => PlayerStateValue;
  getIframe: () => HTMLIFrameElement;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  unloadModule?: (module: string) => void;
  getCurrentTime: () => number;
  mute: () => void;
  destroy: () => void;
};

export type PlayerEvent = { target: Player };
export type PlayerStateEvent = PlayerEvent & { data: PlayerStateValue };

export type PlayerOptions = {
  videoId: string;
  host?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: PlayerStateEvent) => void;
    onError?: (event: PlayerEvent & { data: number }) => void;
  };
};

export type YTNamespace = {
  Player: new (element: HTMLElement, options: PlayerOptions) => Player;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}
