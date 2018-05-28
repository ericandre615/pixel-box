import {
  UPDATE_FORM_INPUT,
  REGISTER_FORM_INPUT,
} from './action-types';

const initialState = {};

export const FormReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_INPUT:
      return Object.assign({}, state, {
        [action.name]: action.value,
      });
    case REGISTER_FORM_INPUT:
      return Object.assign({}, state, {
        [action.name]: action.value,
      });
    default:
      return state;
  }
};

export default FormReducers;
