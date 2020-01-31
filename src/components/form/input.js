import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import identity from 'lodash/identity';
import { getFormValue } from '../../state/form/selectors';
import { registerFormInput, updateFormInput } from '../../state/form/actions';

const FormInput = (props) => {
  useEffect(() => {
    const { dispatchRegisterFormInput, name, value } = props;

    dispatchRegisterFormInput(name, value);
  });

  const handleChange = (evt) => {
    evt.preventDefault();
    const { value } = evt.target;
    const { dispatchUpdateFormInput, name, onChange } = props;

    dispatchUpdateFormInput(name, value);
    onChange(name, value);
  };

  const {
    name,
    value,
    onChange,
    dispatchRegisterFormInput,
    dispatchUpdateFormInput,
    ...rest
  } = props;

  return (
    <input
      type="text"
      name={ name }
      value={ value }
      onChange={ handleChange }
      { ...rest }
    />
  );
};

FormInput.defaultProps = {
  name: '',
  value: '',
  dispatchRegisterFormInput: identity,
  dispatchUpdateFormInput: identity,
  onChange: identity,
};

const mapStateToProps = (state, { name, value }) => ({
  value: getFormValue(state, name) || value,
});

const mapDispatchToProps = dispatch => ({
  dispatchRegisterFormInput: (name, value) => dispatch(registerFormInput(name, value)),
  dispatchUpdateFormInput: (name, value) => dispatch(updateFormInput(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);
