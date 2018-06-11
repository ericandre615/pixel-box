import { SET_ELEMENT_POSITION } from './action-types';

export const setElementPosition = (elem, position = { left: 0, top: 0 }) => ({
  type: SET_ELEMENT_POSITION,
  elem,
  position,
});

export default {
  setElementPosition,
};
