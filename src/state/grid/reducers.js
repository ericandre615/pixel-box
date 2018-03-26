import {
  TOGGLE_SHOW_GRID,
} from './action-types';

const initialState = {
  default: true,
};

export const layerReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_GRID:
      return Object.assign({}, state, {
        [action.id]: !state[action.id],
      });
    default:
      return state;
  }
};

export default layerReducers;
