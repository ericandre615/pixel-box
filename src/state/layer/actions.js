import {
  UPDATE_LAYER,
  CREATE_LAYER,
  REMOVE_LAYER,
} from './action-types';

export const updateLayer = layer => ({
  type: UPDATE_LAYER,
  layer,
});

export const createLayer = layer => ({
  type: CREATE_LAYER,
  layer,
});

export const removeLayer = id => ({
  type: REMOVE_LAYER,
  layer: {
    id,
  },
});

export default {
  updateLayer,
  createLayer,
  removeLayer,
};
