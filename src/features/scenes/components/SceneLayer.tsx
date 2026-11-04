import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { getSceneById } from '../catalog';
import { useSceneStore } from '../store/sceneStore';
import { SceneView } from './SceneView';

export const SceneLayer = () => {
  const currentSceneId = useSceneStore((state) => state.currentSceneId);
  const scene = getSceneById(currentSceneId);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.6;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={scene.id}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: duration, duration: 0 } }}
        transition={{ duration, ease: 'easeInOut' }}
      >
        <SceneView scene={scene} />
      </motion.div>
    </AnimatePresence>
  );
};
