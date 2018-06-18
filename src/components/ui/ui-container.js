import React, { Component } from 'react';
import classnames from 'classnames';

import './ui-menu.css';

const paddingDefaults = {
  top: 0,
  right: 8,
  bottom: 12,
  left: 8,
};

const defaultStyle = {
  // position: 'relative',
  minWidth: '128px',
  backgroundColor: '#818184',
  padding: '0px',
  top: '0px',
  left: '0px',
};

const flattenChildren = nodes => nodes.reduce((acc, curr) => acc.concat(
  (curr.childNodes.length)
    ? flattenChildren(Array.from(curr.childNodes))
    : curr), []);

const filterDOMElements = nodes => nodes.filter(node => node instanceof HTMLElement);
const getLargestValue = (nodes, prop = 'width') => nodes
  .map(child => child[prop])
  .reduce((acc, curr) => ((curr > acc) ? curr : acc), '');
const getHeaderHeight = nodes => nodes
  .filter(child => (child.nodeName === 'H1'))
  .map(child => (window.getComputedStyle(child, null).height))
  .reduce((acc, curr) => parseInt(curr.replace(/\D/g, ''), 10), 0);

export class UiContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: props.width || defaultStyle.width,
      // height: props.height || defaultStyle.height,
      mouseDown: false,
      headerHeight: 24,
      shift: {
        x: 0,
        y: 0,
      },
      dragging: false,
      dragStarted: false,
    };

    this.getWidth = this.getWidth.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  getWidth(node) {
    const childNodes = Array.from(node.childNodes);
    const flatNodes = filterDOMElements(flattenChildren(childNodes));
    const maxWidth = getLargestValue(flatNodes, 'offsetWidth');
    const headerHeight = getHeaderHeight(childNodes);

    this.setState({
      width: `${maxWidth + paddingDefaults.right + paddingDefaults.left}px`,
      headerHeight: headerHeight + paddingDefaults.top,
    });
  }

  handleMouseMove(e) {
    const { id, draggable, setElementPosition } = this.props;
    const { mouseDown, shift: { x: shiftX, y: shiftY } } = this.state;
    const { target: { parentElement } } = e;

    if (!parentElement.id || parentElement.id !== id) {
      return this.setState({ mouseDown: false, dragging: false });
    }

    if (mouseDown && draggable) {
      const calcLeft = `${e.pageX - shiftX}px`;
      const calcTop = `${e.pageY - shiftY}px`;

      setElementPosition(id, { top: calcTop, left: calcLeft });
    }

    return parentElement;
  }

  handleMouseDown(e) {
    e.preventDefault();

    const { target: { parentElement } } = e;
    const { id, draggable, setElementPosition } = this.props;

    this.setState({
      mouseDown: true,
    });

    if (draggable) {
      const { top, left } = parentElement.getBoundingClientRect();
      const shiftX = (e.clientX - left);
      const shiftY = (e.clientY - top);

      this.setState({
        dragging: true,
        dragStarted: true,
        shift: { x: shiftX, y: shiftY },
      });

      const calcLeft = `${e.pageX - shiftX}px`;
      const calcTop = `${e.pageY - shiftY}px`;

      setElementPosition(id, { left: calcLeft, top: calcTop });
    }
  }

  handleMouseUp(e) {
    e.preventDefault();

    this.setState({
      mouseDown: false,
      dragging: false,
    });
  }

  render() {
    const {
      id,
      draggable,
      contextMenu,
      title,
      uiButton,
      children,
      height,
      relative,
      styles,
      layout,
    } = this.props;
    const { width, headerHeight, dragging, dragStarted } = this.state;
    const totalHeight = height + headerHeight;
    const { top, left } = (layout) ? layout[id] || {} : { top: '0px', left: '0px' };
    const containerClassNames = classnames('ui-container', { dragging });
    const menuBarClassNames = classnames('ui-menu-bar', { draggable });

    const currentStyle = Object.assign({},
      defaultStyle,
      styles,
      (relative) ? { position: 'relative' } : null,
      { top, left },
      (dragStarted) ? { position: 'absolute' } : null,
      { width },
      (height)
        ? { height: `${totalHeight}px` }
        : null);

    return (
      <section
        id={ id }
        className={ containerClassNames }
        data-draggable={ draggable }
        style={ currentStyle }
        ref={ this.getWidth }
      >
        { contextMenu }
        <section
          className={ menuBarClassNames }
          onMouseMove={ this.handleMouseMove }
          onMouseUp={ this.handleMouseUp }
          onMouseDown={ this.handleMouseDown }
        >
          <span>
            { title }
          </span>
          { uiButton }
        </section>
        <section className="ui-container-body">
          { children }
        </section>
      </section>
    );
  }
}

export default UiContainer;
