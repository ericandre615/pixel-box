export const getElementPosition = (state, elem) => state.layout[elem] || {};
export const getLayout = state => state.layout || {};

export default {
  getElementPosition,
  getLayout,
};
