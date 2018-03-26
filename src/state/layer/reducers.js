import getProp from 'lodash/get';
import {
  UPDATE_LAYER,
  CREATE_LAYER,
  REMOVE_LAYER,
} from './action-types';

const initialState = {
  default: {
    meta: {
      type: 'pixel',
    },
  },
};

export const layerReducers = (state = initialState, action) => {
  const { [getProp(action, 'layer.id')]: omit, ...newState } = state;

  switch (action.type) {
    case UPDATE_LAYER:
      return Object.assign({}, state, {
        [action.layer.id]: action.layer,
      });
    case CREATE_LAYER:
      return Object.assign({}, state, {
        [action.layer.id]: action.layer,
      });
    case REMOVE_LAYER:
      return newState;
    default:
      return state;
  }
};

export default layerReducers;
