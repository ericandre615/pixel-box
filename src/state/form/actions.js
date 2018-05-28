import {
  UPDATE_FORM_INPUT,
  REGISTER_FORM_INPUT,
} from './action-types';

export const updateFormInput = (name, value) => ({
  type: UPDATE_FORM_INPUT,
  name,
  value,
});

export const registerFormInput = (name, value) => ({
  type: REGISTER_FORM_INPUT,
  name,
  value,
});

export default {
  updateFormInput,
  registerFormInput,
};
