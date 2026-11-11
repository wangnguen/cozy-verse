import { beforeEach, describe, expect, it } from 'vitest';

import {
  DEFAULT_SCENE_ID,
  DEFAULT_SOUND_VOLUME,
  MAX_SOUND_VOLUME,
  MIN_SOUND_VOLUME,
} from '../constants/scene';
import { useSceneStore } from './sceneStore';

const initialState = useSceneStore.getState();
const image = { kind: 'image', src: 'https://example.com/room.jpg' } as const;

describe('custom scenes', () => {
  beforeEach(() => {
    useSceneStore.setState(initialState, true);
  });

  it('adds a scene to the front of the list', () => {
    const { addCustomScene } = useSceneStore.getState();
    addCustomScene({ kind: 'youtube', videoId: 'dQw4w9WgXcQ' });
    const id = addCustomScene(image);
    expect(useSceneStore.getState().customScenes[0]).toMatchObject({ id, group: 'custom' });
  });

  it('reuses the scene when the same link is added twice', () => {
    const { addCustomScene } = useSceneStore.getState();
    const first = addCustomScene(image);
    const second = addCustomScene(image);
    expect(second).toBe(first);
    expect(useSceneStore.getState().customScenes).toHaveLength(1);
  });

  it('cleans up favorites and the current scene on remove', () => {
    const { addCustomScene, toggleFavorite, setCurrentSceneId } = useSceneStore.getState();
    const id = addCustomScene(image);
    toggleFavorite(id);
    setCurrentSceneId(id);

    useSceneStore.getState().removeCustomScene(id);

    const state = useSceneStore.getState();
    expect(state.customScenes).toEqual([]);
    expect(state.favoriteSceneIds).not.toContain(id);
    expect(state.currentSceneId).toBe(DEFAULT_SCENE_ID);
  });

  it('keeps the current scene when another scene is removed', () => {
    const { addCustomScene, removeCustomScene } = useSceneStore.getState();
    const id = addCustomScene(image);
    removeCustomScene(id);
    expect(useSceneStore.getState().currentSceneId).toBe(DEFAULT_SCENE_ID);
    useSceneStore.getState().setCurrentSceneId('navy');
    removeCustomScene(addCustomScene(image));
    expect(useSceneStore.getState().currentSceneId).toBe('navy');
  });
});

describe('scene sound', () => {
  beforeEach(() => {
    useSceneStore.setState(initialState, true);
  });

  it('starts muted at the default volume', () => {
    const { soundOn, volume } = useSceneStore.getState();
    expect(soundOn).toBe(false);
    expect(volume).toBe(DEFAULT_SOUND_VOLUME);
  });

  it('toggles sound on and off', () => {
    const { toggleSound } = useSceneStore.getState();
    toggleSound();
    expect(useSceneStore.getState().soundOn).toBe(true);
    toggleSound();
    expect(useSceneStore.getState().soundOn).toBe(false);
  });

  it.each([
    [70, 70],
    [150, MAX_SOUND_VOLUME],
    [-5, MIN_SOUND_VOLUME],
  ])('clamps volume %i to %i', (input, expected) => {
    useSceneStore.getState().setVolume(input);
    expect(useSceneStore.getState().volume).toBe(expected);
  });
});
