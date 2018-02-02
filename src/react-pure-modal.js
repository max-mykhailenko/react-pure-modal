import React from 'react';
import PropTypes from 'prop-types';
import './react-pure-modal.css';

import PureModalContent from './pure-modal-content.js';

class PureModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleEndDrag = this.handleEndDrag.bind(this);

    this.handleEsc = this.handleEsc.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.hash = Math.random().toString();
    this.state = {
      isOpen: props.isOpen || false,
      isDragged: false,
      x: null,
      y: null,
      deltaX: 0,
      deltaY: 0,
      mouseOffsetX: 0,
      mouseOffsetY: 0,
    };
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.setModalContext();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.isOpen === 'boolean' && this.props.isOpen !== nextProps.isOpen) {
      if (nextProps.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  componentWillUnmount() {
    this.unsetModalContext();
  }

  setModalContext() {
    document.addEventListener('keydown', this.handleEsc);
    document.activeElement.blur();
    document.body.classList.add('body-modal-fix');
  }

  handleEsc(event) {
    const allModals = document.querySelectorAll('.pure-modal');
    if (
      allModals.length && !allModals[allModals.length - 1].classList.contains(this.hash)
    ) return false;
    if (typeof document.activeElement.value === 'undefined' && event.keyCode === 27) {
      this.close(event);
    }
  }

  unsetModalContext() {
    document.removeEventListener('keydown', this.handleEsc);
    document.body.classList.remove('body-modal-fix');
    this.setState({
      x: null,
      y: null,
      deltaX: 0,
      deltaY: 0,
      mouseOffsetX: 0,
      mouseOffsetY: 0,
    });
  }

  getCoords(e) {
    let { pageX, pageY } = e;
    if (e.changedTouches && e.changedTouches.length === 1) {
      pageX = e.changedTouches[0].pageX;
      pageY = e.changedTouches[0].pageY;
    }
    return {
      pageX,
      pageY,
    };
  }

  handleStartDrag(e) {
    if (e.changedTouches && e.changedTouches.length > 1) return false;

    e.preventDefault();

    const { pageX, pageY } = this.getCoords(e);
    const { top, left } = e.currentTarget.getBoundingClientRect();

    return this.setState({
      isDragged: true,
      x: typeof this.state.x === 'number' ? this.state.x : left,
      y: typeof this.state.y === 'number' ? this.state.y : top,
      mouseOffsetX: pageX - left,
      mouseOffsetY: pageY - top,
    });
  }

  handleDrag(e) {
    if (e.changedTouches && e.changedTouches.lenght > 1) {
      return this.handleEndDrag();
    }

    e.preventDefault();

    const { pageX, pageY } = this.getCoords(e);

    return this.setState({
      deltaX: pageX - this.state.x - this.state.mouseOffsetX,
      deltaY: pageY - this.state.y - this.state.mouseOffsetY,
    });
  }

  handleEndDrag() {
    return this.setState({ isDragged: false });
  }

  open(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
      this.setModalContext();
    }
  }

  close(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (this.state.isOpen) {
      let isOpen = false;
      if (this.props.onClose && event) {
        isOpen = !this.props.onClose();
      }

      if (this.state.isOpen !== isOpen) {
        this.setState({
          isOpen,
        });
        this.unsetModalContext();
      }
    }
  }

  handleBackdropClick(event) {
    if (event) {
      if (!event.target.classList.contains('pure-modal-backdrop')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }
    this.close(event);
  }

  render() {
    if (!this.state.isOpen) {
      return null;
    }

    const {
      children,
      replace,
      className,
      header,
      footer,
      scrollable,
      draggable,
      width,
    } = this.props;

    let backdropclasses = ['pure-modal-backdrop'];
    let modalclasses = ['pure-modal', this.hash];
    let bodyClasses = ['panel-body'];

    if (className) {
      modalclasses = modalclasses.concat(className);
    }

    if (scrollable) {
      bodyClasses = bodyClasses.concat('scrollable');
    } else {
      backdropclasses = backdropclasses.concat('scrollable');
      modalclasses = modalclasses.concat('auto-height');
    }

    if (draggable) {
      backdropclasses = backdropclasses.concat('backdrop-overflow-hidden');
    }

    return (
      <div
        className={backdropclasses.join(' ')}
        onClick={this.handleBackdropClick}
        onTouchMove={this.state.isDragged ? this.handleDrag : null}
        onMouseMove={this.state.isDragged ? this.handleDrag : null}
      >
        <div
          className={modalclasses.join(' ')}
          style={{
            transform: `translate(${this.state.deltaX}px, ${this.state.deltaY}px)`,
            transition: 'none',
            width,
          }}
        >
          <PureModalContent
            replace={replace}
            header={header}
            footer={footer}
            onDragStart={draggable ? this.handleStartDrag : null}
            onDragEnd={draggable ? this.handleEndDrag : null}
            onClose={this.close}
            bodyClass={bodyClasses.join(' ')}
          >
            {children}
          </PureModalContent>
        </div>
      </div>
    );
  }
}

PureModal.defaultProps = {
  mode: 'modal',
  replace: false,
  scrollable: true,
  draggable: false,
};

PureModal.propTypes = {
  mode: PropTypes.oneOf(['modal', 'tooltip']),
  replace: PropTypes.bool,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  scrollable: PropTypes.bool,
  draggable: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default PureModal;
