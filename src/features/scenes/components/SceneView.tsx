import type { Scene } from '@/shared/types/scene';

import { ColorScene } from '../renderers/ColorScene';
import { GradientScene } from '../renderers/GradientScene';
import { ImageScene } from '../renderers/ImageScene';
import { VideoScene } from '../renderers/VideoScene';

export const SceneView = ({ scene }: { scene: Scene }) => {
  switch (scene.kind) {
    case 'color':
      return <ColorScene scene={scene} />;
    case 'gradient':
      return <GradientScene scene={scene} />;
    case 'image':
      return <ImageScene scene={scene} />;
    case 'video':
      return <VideoScene scene={scene} />;
    default:
      return null;
  }
};
