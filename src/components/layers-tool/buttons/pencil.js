import React, { Component } from 'react';
import { Button } from '../../elements/button';

export class PencilButton extends Component {
  constructor(props) {
    super(props);

    this.setEraser = this.setEraser.bind(this);
  }

  setEraser() {
    const { setColor } = this.props;

    setColor('eraser');
  }

  render() {
    return (
      <Button
        classNames="icon-eraser"
        onClick={ this.setEraser }
      />
    );
  }
}

export default PencilButton;
