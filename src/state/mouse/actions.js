import { SET_MOUSE_POSITION, TOGGLE_MOUSE_DOWN } from './action-types';

export const setMousePosition = (mouse = { x: 0, y: 0 }) => ({
  type: SET_MOUSE_POSITION,
  mouse,
});

export const toggleMouseDown = toggle => ({
  type: TOGGLE_MOUSE_DOWN,
  mouse: {
    toggle,
  },
});

export default {
  setMousePosition,
  toggleMouseDown,
};
