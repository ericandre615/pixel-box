import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './notify.css';

const defaultStyles = {
  backgroundColor: 'green',
  color: 'white',
  fontSize: '0.7em',
};

export const Notify = (props) => {
  const {
    message,
    backgroundColor,
    color,
    fontSize,
    timeout,
  } = props;

  const styles = Object.assign({}, defaultStyles,
    (backgroundColor) ? { backgroundColor } : null,
    (color) ? { color } : null,
    (fontSize) ? { fontSize } : null);

  return (
    <CSSTransition
      classNames="notify-transition"
      timeout={ timeout }
    >
      <div
        id="notify"
        styles={ styles }
      >
        <p>{ message }</p>
      </div>
    </CSSTransition>
  );
};

Notify.defaultProps = {
  timeout: 500,
};

export default Notify;
