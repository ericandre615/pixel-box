import { SET_ELEMENT_POSITION } from './action-types';

const initialState = {};

export const layoutReducers = (state = initialState, action) => {
  const { elem, position } = action;
  switch (action.type) {
    case SET_ELEMENT_POSITION:
      return Object.assign({}, state, {
        [elem]: {
          top: position.top,
          left: position.left,
        },
      });
    default:
      return state;
  }
};

export default layoutReducers;
