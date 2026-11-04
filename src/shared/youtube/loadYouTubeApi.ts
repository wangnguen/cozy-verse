import type { YTNamespace } from './types';

const API_SRC = 'https://www.youtube.com/iframe_api';

let apiPromise: Promise<YTNamespace> | undefined;

export const loadYouTubeApi = (): Promise<YTNamespace> => {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error('YouTube API loaded without YT.Player'));
    };

    const script = document.createElement('script');
    script.src = API_SRC;
    script.async = true;
    script.onerror = () => {
      script.remove();
      apiPromise = undefined; // allow a retry on the next call
      reject(new Error('Failed to load the YouTube IFrame API'));
    };
    document.head.append(script);
  });

  return apiPromise;
};
