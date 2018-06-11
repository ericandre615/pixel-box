import getProp from 'lodash/get';
import { generate } from 'shortid';
import {
  UPDATE_LAYER,
  CREATE_LAYER,
  REMOVE_LAYER,
} from './action-types';

const initialId = generate();

const initialState = {
  backgroundLayer: {
    id: 'backgroundLayer',
    label: 'backgroundLayer',
    priority: 0,
    locked: true,
    type: 'pixel',
  },
  [`${initialId}`]: {
    id: `${initialId}`,
    label: 'default',
    priority: 1,
    locked: false,
    type: 'pixel',
  },
};

const largestPriority = collection => Object.keys(collection)
  .map(({ priority }) => priority)
  .reduce((acc, curr) => ((curr > acc) ? curr : acc), 0);

export const layerReducers = (state = initialState, action) => {
  const { [getProp(action, 'layer.id')]: omit, ...newState } = state;
  const generatedId = generate();

  switch (action.type) {
    case UPDATE_LAYER:
      // return (state[action.layer.id]) ? Object.assign({}, state, {
      //   [action.layer.id]: action.layer,
      // }) : state;
      return Object.assign({}, state, {
        [action.layer.id]: action.layer,
      });
    case CREATE_LAYER:
      return Object.assign({}, state, {
        [generatedId]: Object.assign({}, action.layer, {
          id: generatedId,
          priority: largestPriority(state) + 1,
        }),
      });
    case REMOVE_LAYER:
      return newState;
    default:
      return state;
  }
};

export default layerReducers;
