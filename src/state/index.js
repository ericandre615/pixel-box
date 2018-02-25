import { INVALIDATE_SESSION } from './action-types';

const session = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SESSION:
      return {};
    default:
      return state;
  }
};

export default {
  session,
};
