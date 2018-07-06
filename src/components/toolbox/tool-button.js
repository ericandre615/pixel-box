import React, { Component } from 'react';
import classnames from 'classnames';
import Button from '../elements/button';

const toolStyles = {
  selected: {
    backgroundColor: '#a8a8ab',
  },
};

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
    const { tool, selectedTool } = this.props;
    const selected = tool && tool === selectedTool;
    const buttonClassnames = classnames(
      `icon-${tool}`,
      'tool-button',
      {
        selected,
      });

    return (
      <Button
        className={ buttonClassnames }
        type="flat"
        style={ selected && toolStyles.selected }
        onClick={ this.setTool }
      />
    );
  }
}

export default ToolButton;
