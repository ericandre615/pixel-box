import { SET_MOUSE_POSITION, TOGGLE_MOUSE_DOWN } from './action-types';

const initialState = {
  x: 0,
  y: 0,
  down: false,
};

export const mouseReducers = (state = initialState, { type, mouse = { x: 0, y: 0 } }) => {
  const { x, y, toggle } = mouse;

  switch (type) {
    case SET_MOUSE_POSITION:
      return Object.assign({}, state, { x, y });
    case TOGGLE_MOUSE_DOWN:
      return Object.assign({}, state, {
        down: (typeof toggle === 'boolean') ? toggle : !state.down,
      });
    default:
      return state;
  }
};

export default mouseReducers;
