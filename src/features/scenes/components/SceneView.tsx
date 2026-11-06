import { SCENE_KIND } from '@/shared/constants/scene';
import type { Scene } from '@/shared/types/scene';

import { ColorScene } from '../renderers/ColorScene';
import { GradientScene } from '../renderers/GradientScene';
import { ImageScene } from '../renderers/ImageScene';
import { VideoScene } from '../renderers/VideoScene';
import { YouTubeScene } from '../renderers/YouTubeScene';

type SceneViewProps = { scene: Scene };

export const SceneView = ({ scene }: SceneViewProps) => {
  switch (scene.kind) {
    case SCENE_KIND.COLOR:
      return <ColorScene scene={scene} />;
    case SCENE_KIND.GRADIENT:
      return <GradientScene scene={scene} />;
    case SCENE_KIND.IMAGE:
      return <ImageScene scene={scene} />;
    case SCENE_KIND.VIDEO:
      return <VideoScene scene={scene} />;
    case SCENE_KIND.YOUTUBE:
      return <YouTubeScene scene={scene} />;
  }
};
