export const getLayer = (state, id) => state.layer[id];
export const getLayers = state => state.layer;
export const getCurrentLayer = state => state.current.layer;

export default {
  getLayer,
  getLayers,
  getCurrentLayer,
};
