import { getSceneById } from '../catalog';
import { useSceneStore } from '../store/sceneStore';
import { SceneView } from './SceneView';

export const SceneLayer = () => {
  const currentSceneId = useSceneStore((state) => state.currentSceneId);
  const scene = getSceneById(currentSceneId);

  return <SceneView scene={scene} />;
};
