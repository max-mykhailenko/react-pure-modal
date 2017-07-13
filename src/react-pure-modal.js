/* @flow */
import React from 'react';
import './react-pure-modal.css';

// Should I ignore this errors ?
//
// covariantErr: covariant property incompatible with contravariant use
// possiblyNullErr: Method cannot be called or property cannot be accessed on possibly null value

class PureModal extends React.Component {
  props: {
    mode: 'modal' | 'tooltip',
    replace: boolean,
    children: HTMLElement,
    isOpen: boolean,
    scrollable: boolean,
    onClose: Function,
    className: string,
    width: string,
    header: string | HTMLElement,
    footer: string | HTMLElement,
  };

  state: {
    isOpen: boolean,
  }

  static defaultProps = {
    mode: 'modal',
    replace: false,
    scrollable: true,
  };

  constructor(props: Object) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this); // covariantErr
    this.close = this.close.bind(this); // covariantErr
    this.open = this.open.bind(this); // covariantErr
    this.handleBackdropClick = this.handleBackdropClick.bind(this); // covariantErr
    this.state = {
      isOpen: props.isOpen || false,
    };
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.setModalContext();
    }
  }

  componentWillReceiveProps(nextProps: Object) {
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
    document.activeElement.blur(); // possiblyNullErr
    document.body.classList.add('body-modal-fix'); // possiblyNullErr
  }

  handleEsc(event: Event) {
    if (typeof document.activeElement.value === 'undefined' && event.keyCode === 27) { // possiblyNullErr
      this.close(event);
    }
  }

  unsetModalContext() {
    document.removeEventListener('keydown', this.handleEsc);
    document.body.classList.remove('body-modal-fix'); // possiblyNullErr
  }

  open(event: ?Event) {
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

  close(event: ?Event) {
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

  handleBackdropClick(event: Event) {
    if (event) {
      if (!event.target.classList.contains('pure-modal-backdrop')) { // possiblyNullErr
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
      width,
    } = this.props;

    let backdropclasses = ['pure-modal-backdrop'];
    let modalclasses = ['pure-modal'];
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

    const attrs = {};
    if (width) {
      attrs.style = { width };
    }

    return (
      <div
        className={backdropclasses.join(' ')}
        onClick={this.handleBackdropClick}
      >
        <div
          className={modalclasses.join(' ')}
          {...attrs}
        >
          {
            replace ?
            children :
            (
              <div className="panel panel-default">
                <div className="panel-heading">
                  {
                    header &&
                    (
                      <h3 className="panel-title">
                        {header}
                      </h3>
                    )
                  }
                  <div onClick={this.close} className="close">&times;</div>
                </div>
                <div className={bodyClasses.join(' ')}>
                  {children}
                </div>
                {
                  footer &&
                  (
                    <div className="panel-footer">
                      {footer}
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default PureModal;
