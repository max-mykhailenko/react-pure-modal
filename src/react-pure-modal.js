import React from 'react';

class PureModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleEsc = this.handleEsc.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.state = {
      isOpen: props.isOpen || false,
    }
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.setModalContext();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.isOpen === 'boolean') {
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

  handleEsc(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  setModalContext() {
    document.addEventListener('keydown', this.handleEsc);
    document.body.classList.add('body-modal-fix');
  }

  unsetModalContext() {
    document.removeEventListener('keydown', this.handleEsc);
    document.body.classList.remove('body-modal-fix');
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
      if (this.props.onClose) {
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
    this.close();
  }

  render() {
    if (!this.state.isOpen) {
      return null;
    }

    const { children, replace, className = '', header, footer } = this.props;

    return (
      <div className="pure-modal-backdrop" onClick={this.handleBackdropClick}>
        <div className={`pure-modal ${ className }`}>
          {
            replace ?
            children :
            <div className="panel panel-default">
              <div className="panel-heading">
                {
                  header &&
                  <h3 className="panel-title">
                    {header}
                  </h3>
                }
                <div onClick={this.close} className="close">&times;</div>
              </div>
              <div className="panel-body scrollable">
                {children}
              </div>
              {
                footer &&
                <div className="panel-footer" ref="footer">
                  {footer}
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

PureModal.defaultProps = {
  mode: 'modal',
  replace: false,
};

PureModal.propTypes = {
  mode: React.PropTypes.oneOf(['modal', 'tooltip']),
  replace: React.PropTypes.bool,
  children: React.PropTypes.node,
  isOpen: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  className: React.PropTypes.string,
  header: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
  footer: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
};

export default PureModal;
