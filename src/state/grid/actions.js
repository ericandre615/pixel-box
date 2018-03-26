import {
  TOGGLE_SHOW_GRID,
} from './action-types';

export const toggleShowGrid = id => ({
  type: TOGGLE_SHOW_GRID,
  id,
});

export default {
  toggleShowGrid,
};
