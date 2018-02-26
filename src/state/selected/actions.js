import { SET_SELECTED } from './action-types';

export const setSelected = (key, value) => ({
  type: SET_SELECTED,
  key,
  value,
});

export default {
  setSelected,
};
