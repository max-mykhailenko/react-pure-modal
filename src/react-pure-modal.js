import React from 'react';
import keymage from 'keymage';
import uniqueId from 'lodash/uniqueId';

class PureModal extends React.Component {
  constructor(props) {
    super(props);
    this.isOpen = props.isOpen || false;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.scope = uniqueId('modal-');
  }

  componentDidMount() {
    keymage(this.scope, 'esc', this.close);

    if (this.props.isOpen) {
      this.setModalContext();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.isOpen === 'boolean' ) {
      this.isOpen = nextProps.isOpen;
    }
  }

  componentWillUpdate() {
    if (this.isOpen) {
      if (this.props.isOpen !== this.isOpen) {
        this.setModalContext();
      }
    } else {
      this.unsetModalContext();
    }
  }

  componentWillUnmount() {
    keymage.unbind(this.scope, 'esc', this.close);
    this.unsetModalContext();
  }

  setModalContext() {
    document.body.classList.add('body-modal-fix');
    keymage.pushScope(this.scope);
  }

  unsetModalContext() {
    document.body.classList.remove('body-modal-fix');
    keymage.popScope();
  }

  open(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (!this.isOpen) {
      this.isOpen = true;
      this.forceUpdate();
    }
  }

  close(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (this.isOpen) {
      if (this.props.onClose) {
        this.isOpen = !this.props.onClose();
      } else {
        this.isOpen = false;
      }
      this.forceUpdate();
    }
  }

  handleBackdropClick(event) {
    if (event) {
      if (!event.target.classList.contains('modal-backdrop')) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }
    this.close();
  }

  render() {
    if (!this.isOpen) {
      return null;
    }

    const { children, replace, className = '', header, footer } = this.props;

    return (
      <div className="modal-backdrop" onClick={this.handleBackdropClick}>
        <div className={`smart-modal ${ className }`}>
          {
            replace ?
            children :
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  {header}
                  <div onClick={this.close} className="close">&times;</div>
                </h3>
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
