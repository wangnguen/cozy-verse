import type { Scene, SceneGroup } from '@/shared/types/scene';

export const SCENES: Scene[] = [
  {
    // Unsplash: https://images.unsplash.com/photo-1688904015681-3391613bc3ff
    id: 'rainy-tokyo',
    name: 'Rainy Tokyo',
    group: 'city',
    kind: 'image',
    src: '/scenes/rainy-tokyo.jpg',
    thumbnail: '/scenes/thumbnails/rainy-tokyo.jpg',
  },
  {
    // Hamin Yoon, https://unsplash.com/photos/qcjl3RY7bh0
    id: 'night-desk',
    name: 'Night Desk',
    group: 'city',
    kind: 'image',
    src: '/scenes/night-desk.jpg',
    thumbnail: '/scenes/thumbnails/night-desk.jpg',
    focus: '40% 50%',
  },
  {
    // Juzzepo, https://unsplash.com/photos/SNy0Diwv0vI
    id: 'cozy-cafe',
    name: 'Cozy Café',
    group: 'cafe',
    kind: 'image',
    src: '/scenes/cozy-cafe.jpg',
    thumbnail: '/scenes/thumbnails/cozy-cafe.jpg',
    focus: '75% 50%',
  },
  {
    // Dejan Zakic, https://unsplash.com/photos/rr2EF3J5F2Y
    id: 'misty-forest',
    name: 'Misty Forest',
    group: 'nature',
    kind: 'image',
    src: '/scenes/misty-forest.jpg',
    thumbnail: '/scenes/thumbnails/misty-forest.jpg',
  },
  {
    // Pexels, https://www.pexels.com/video/drops-of-water-dripping-on-a-glass-surface-2644023/
    id: 'rainy-glass',
    name: 'Rainy Glass',
    group: 'nature',
    kind: 'video',
    src: '/scenes/videos/rainy.mp4',
    poster: '/scenes/rainy-glass.jpg',
  },
  {
    // panpan ma, https://unsplash.com/photos/UVdS0D3rDNM
    id: 'quiet-library',
    name: 'Quiet Library',
    group: 'library',
    kind: 'image',
    src: '/scenes/quiet-library.jpg',
    thumbnail: '/scenes/thumbnails/quiet-library.jpg',
  },
  {
    // 行之LV, https://wall.alphacoders.com/big.php?i=1059120
    id: 'sunlit-desk',
    name: 'Sunlit Desk',
    group: 'anime',
    kind: 'image',
    src: '/scenes/sunlit-desk.jpg',
    thumbnail: '/scenes/thumbnails/sunlit-desk.jpg',
    focus: '40% 50%',
  },
  {
    // AniWall (AI-generated), https://aniwall.in/wallpaper/cozy-rainy-night-in-the-city
    id: 'rainy-window',
    name: 'Rainy Window',
    group: 'anime',
    kind: 'image',
    src: '/scenes/rainy-window.jpg',
    thumbnail: '/scenes/thumbnails/rainy-window.jpg',
    focus: '40% 50%',
  },
  {
    // BanhKem 236, https://unsplash.com/photos/xoKbH8VERR0
    id: 'bookshelf-cafe',
    name: 'Bookshelf Café',
    group: 'study-with-me',
    kind: 'image',
    src: '/scenes/bookshelf-cafe.jpg',
    thumbnail: '/scenes/thumbnails/bookshelf-cafe.jpg',
    focus: '75% 50%',
  },
  {
    // Relax with cat, https://www.youtube.com/watch?v=GrG2-oX5z24
    id: 'relax-with-cat',
    name: 'Relax with Cat',
    group: 'study-with-me',
    kind: 'youtube',
    videoId: 'GrG2-oX5z24',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    group: 'gradient',
    kind: 'gradient',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    group: 'gradient',
    kind: 'gradient',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #831843 55%, #c2410c 100%)',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    group: 'color',
    kind: 'color',
    color: '#18181b',
  },
  {
    id: 'navy',
    name: 'Navy',
    group: 'color',
    kind: 'color',
    color: '#0f172a',
  },
];

export const SCENE_GROUPS: SceneGroup[] = [...new Set(SCENES.map((s) => s.group))];

export const GROUP_LABELS: Record<SceneGroup, string> = {
  anime: 'Anime',
  cafe: 'Café',
  nature: 'Nature',
  city: 'City',
  library: 'Library',
  'study-with-me': 'Study With Me',
  gradient: 'Gradient',
  color: 'Color',
  custom: 'My scenes',
};

export const DEFAULT_SCENE_ID = 'rainy-tokyo';

export const getSceneById = (sceneId: string, customScenes: Scene[] = []): Scene => {
  const currentScene = [...customScenes, ...SCENES].find((scene) => scene.id === sceneId);
  if (!currentScene) return SCENES.find((scene) => scene.id === DEFAULT_SCENE_ID)!;
  return currentScene;
};
