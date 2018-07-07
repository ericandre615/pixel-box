import React, { Fragment } from 'react';
import { UiContainer } from '../ui/ui-container';
import ToolButton from './tool-button';

const id = 'toolbox-ui-container';

export const ToolBox = ({ selectedTool, setSelectedTool, setElementPosition, mouse, layout }) => {
  const EraserButton = ToolButton;
  const PencilButton = ToolButton;
  const DropperButton = ToolButton;
  const LineButton = ToolButton;
  const RectButton = ToolButton;

  return (
    <Fragment>
      <UiContainer
        id={ id }
        layout={ layout }
        title="Toolbox"
        mouse={ mouse }
        draggable
        relative
        setElementPosition={ setElementPosition }
      >
        <EraserButton tool="eraser" setSelectedTool={ setSelectedTool } selectedTool={ selectedTool } />
        <PencilButton tool="pencil" setSelectedTool={ setSelectedTool } selectedTool={ selectedTool } />
        <DropperButton tool="eyedropper" setSelectedTool={ setSelectedTool } selectedTool={ selectedTool } />
        <LineButton tool="line" setSelectedTool={ setSelectedTool } selectedTool={ selectedTool } />
        <RectButton tool="rectangle" setSelectedTool={ setSelectedTool } selectedTool={ selectedTool } />
      </UiContainer>
    </Fragment>
  );
};

export default ToolBox;
