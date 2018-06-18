import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { getMouse } from '../../state/mouse/selectors';
import { getLayers } from '../../state/layer/selectors';
import { getShowGrid } from '../../state/grid/selectors';
import { getSelected } from '../../state/selected/selectors';
import { getLayout } from '../../state/layout/selectors';
import { setMousePosition, toggleMouseDown } from '../../state/mouse/actions';
import { createLayer, removeLayer, updateLayer } from '../../state/layer/actions';
import { toggleShowGrid } from '../../state/grid/actions';
import { setSelected } from '../../state/selected/actions';
import { setElementPosition } from '../../state/layout/actions';
import EditorCanvas from '../editor-canvas';
import ToolBox from '../../components/toolbox';
import LayersTool from '../../components/layers-tool';

export class Main extends Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseMove(e) {
    const { dispatchSetMousePosition } = this.props;
    const {
      offsetX: x,
      offsetY: y,
    } = e.nativeEvent;

    dispatchSetMousePosition({ x, y });
  }

  handleMouseDown() {
    const { dispatchToggleMouseDown } = this.props;

    dispatchToggleMouseDown(true);
  }

  handleMouseUp() {
    const { dispatchToggleMouseDown } = this.props;

    dispatchToggleMouseDown(false);
  }

  render() {
    const {
      mouse,
      layers,
      layout,
      showGrid,
      selectedColor,
      selectedTool,
      selectedLayer,
      dispatchCreateLayer,
      dispatchRemoveLayer,
      dispatchUpdateLayer,
      dispatchSetSelectedColor,
      dispatchSetSelectedTool,
      dispatchSetSelectedLayer,
      dispatchToggleShowGrid,
      dispatchSetElementPosition,
    } = this.props;

    const activePixel = { color: selectedColor };

    return (
      <section
        role="main"
        onMouseDown={ this.handleMouseDown }
        onMouseUp={ this.handleMouseUp }
        onMouseMove={ this.handleMouseMove }
        style={{ backgroundColor: 'aliceblue' }}
      >
        <EditorCanvas
          mouse={ mouse }
          layers={ layers }
          layout={ layout }
          pixel={ activePixel }
          tool={ selectedTool }
          showGrid={ showGrid }
          selectedLayer={ selectedLayer }
          removeLayer={ dispatchRemoveLayer }
          updateLayer={ dispatchUpdateLayer }
          toggleGrid={ dispatchToggleShowGrid }
          setElementPosition={ dispatchSetElementPosition }
          setSelectedColor={ dispatchSetSelectedColor }
        />
        <SketchPicker
          color={ selectedColor }
          onChangeComplete={ dispatchSetSelectedColor }
        />
        <ToolBox
          mouse={ mouse }
          layout={ layout }
          setSelectedTool={ dispatchSetSelectedTool }
          setElementPosition={ dispatchSetElementPosition }
        />
        <LayersTool
          mouse={ mouse }
          layers={ layers }
          layout={ layout }
          selectedLayer={ selectedLayer }
          updateLayer={ dispatchUpdateLayer }
          createLayer={ dispatchCreateLayer }
          setElementPosition={ dispatchSetElementPosition }
          setSelectedLayer={ dispatchSetSelectedLayer }
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  mouse: getMouse(state),
  layers: getLayers(state),
  layout: getLayout(state),
  showGrid: getShowGrid('editor-canvas')(state),
  selectedColor: getSelected('color')(state),
  selectedTool: getSelected('tool')(state),
  selectedLayer: getSelected('layer')(state),
});

const mapDispatchToProps = dispatch => ({
  dispatchSetMousePosition: mouse => dispatch(setMousePosition(mouse)),
  dispatchToggleMouseDown: toggle => dispatch(toggleMouseDown(toggle)),
  dispatchCreateLayer: layer => dispatch(createLayer(layer)),
  dispatchRemoveLayer: id => dispatch(removeLayer(id)),
  dispatchUpdateLayer: layer => dispatch(updateLayer(layer)),
  dispatchSetSelectedColor: color => dispatch(setSelected('color', color)),
  dispatchSetSelectedTool: tool => dispatch(setSelected('tool', tool)),
  dispatchSetSelectedLayer: layer => dispatch(setSelected('layer', layer)),
  dispatchToggleShowGrid: grid => dispatch(toggleShowGrid(grid)),
  dispatchSetElementPosition: (id, position) => dispatch(setElementPosition(id, position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
