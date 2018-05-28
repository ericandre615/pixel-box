import React, { Component } from 'react';
import { connect } from 'react-redux';
import identity from 'lodash/identity';
import { getFormValue } from '../../state/form/selectors';
import { registerFormInput, updateFormInput } from '../../state/form/actions';

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatchRegisterFormInput, name, value } = this.props;

    dispatchRegisterFormInput(name, value);
  }

  handleChange(e) {
    e.preventDefault();
    const { value } = e.target;
    const { dispatchUpdateFormInput, name, onChange } = this.props;

    dispatchUpdateFormInput(name, value);
    onChange(name, value);
  }

  render() {
    const {
      name,
      value,
      onChange,
      dispatchRegisterFormInput,
      dispatchUpdateFormInput,
      ...rest
    } = this.props;

    return (
      <input
        type="text"
        name={ name }
        value={ value }
        onChange={ this.handleChange }
        { ...rest }
      />
    );
  }
}

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
