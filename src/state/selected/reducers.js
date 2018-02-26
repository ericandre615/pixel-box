import { SET_SELECTED } from './action-types';

const initialState = {};

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
