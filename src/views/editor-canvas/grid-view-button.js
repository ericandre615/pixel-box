import React from 'react';
import classnames from 'classnames';
import Button from '../../components/elements/button';

export const GridViewButton = ({ toggleGrid, showGrid }) => {
  const classNames = classnames({
    'icon-eye': !showGrid,
    'icon-eye-off': showGrid,
  });

  return (
    <Button
      className={ classNames }
      type="menu"
      style={{ float: 'right' }}
      onClick={ toggleGrid }
    />
  );
};

export default GridViewButton;
