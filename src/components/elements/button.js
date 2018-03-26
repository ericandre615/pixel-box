import React from 'react';
import classnames from 'classnames';

import './button.css';

const defaultStyles = {
  border: 'none',
  outline: 'none',
  padding: '.5em 1em',
  backgroundColor: '#798fa2',
  color: 'white',
  fontWeight: 'bold',
  margin: '.25em',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .55)',
  transition: 'box-shadow .10s',
};

const flatStyles = {
  backgroundColor: 'initial',
  boxShadow: 'none',
  transition: 'none',
};

const menuStyles = {
  padding: '0px',
  margin: '0px',
};

const buttonTypes = {
  default: defaultStyles,
  flat: flatStyles,
  menu: Object.assign({}, flatStyles, menuStyles),
};

export const Button = ({
  className,
  onClick,
  children,
  style,
  type = 'default',
}) => {
  const baseStyle = type ? buttonTypes[type] : {};
  const buttonStyles = Object.assign({}, defaultStyles, baseStyle, style);
  const classNames = classnames(className, 'ui-button');

  return (
    <button className={ classNames } onClick={ onClick } style={ buttonStyles }>
      { children }
    </button>
  );
};

export default Button;
