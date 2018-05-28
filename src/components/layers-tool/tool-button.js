import React, { Component } from 'react';
import Button from '../elements/button';

export class ToolButton extends Component {
  constructor(props) {
    super(props);

    this.setTool = this.setTool.bind(this);
  }

  setTool() {
    const { setSelectedTool, tool } = this.props;

    setSelectedTool(tool);
  }

  render() {
    const { tool } = this.props;

    return (
      <Button
        className={ `icon-${tool}` }
        type="flat"
        onClick={ this.setTool }
      />
    );
  }
}

export default ToolButton;
