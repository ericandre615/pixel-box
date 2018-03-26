import { SET_SELECTED } from './action-types';

const initialState = {
  color: {
    hex: '#000000',
    oldHue: 0,
    rgb: { r: 0, g: 0, b: 0, a: 1 },
  },
  tool: 'pencil',
};

export const selectedReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
};

export default selectedReducers;
