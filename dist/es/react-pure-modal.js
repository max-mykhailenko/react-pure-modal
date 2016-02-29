// import React, { Component, PropTypes } from 'react';
var keymage = require('keymage');
var uniqueId = require('lodash/uniqueId');

var PureModal = function (_Component) {
  babelHelpers.inherits(PureModal, _Component);

  function PureModal(props) {
    babelHelpers.classCallCheck(this, PureModal);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PureModal).call(this, props));

    _this.isOpen = false;
    _this.close = _this.close.bind(_this);
    _this.open = _this.open.bind(_this);
    _this.handleBackdropClick = _this.handleBackdropClick.bind(_this);
    _this.scope = uniqueId('modal-');
    return _this;
  }

  babelHelpers.createClass(PureModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      keymage(this.scope, 'esc', this.close);

      if (this.props.isOpen) {
        this.setModalContext();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.isOpen = nextProps.isOpen;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      if (this.isOpen) {
        if (this.props.isOpen !== this.isOpen) {
          this.setModalContext();
        }
      } else {
        this.unsetModalContext();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      keymage.unbind(this.scope, 'esc', this.close);
      this.unsetModalContext();
    }
  }, {
    key: 'setModalContext',
    value: function setModalContext() {
      document.body.classList.add('body-modal-fix');
      keymage.pushScope(this.scope);
    }
  }, {
    key: 'unsetModalContext',
    value: function unsetModalContext() {
      document.body.classList.remove('body-modal-fix');
      keymage.popScope();
    }
  }, {
    key: 'open',
    value: function open(event) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (!this.isOpen) {
        this.isOpen = true;
        this.forceUpdate();
      }
    }
  }, {
    key: 'close',
    value: function close(event) {
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
  }, {
    key: 'handleBackdropClick',
    value: function handleBackdropClick(event) {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
        if (!event.target.classList.contains('modal-backdrop')) {
          return;
        }
      }
      this.close();
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.isOpen) {
        return null;
      }

      var _props = this.props;
      var children = _props.children;
      var replace = _props.replace;
      var className = _props.className;
      var header = _props.header;
      var footer = _props.footer;


      return React.createElement(
        'div',
        { className: 'modal-backdrop', onClick: this.handleBackdropClick },
        React.createElement(
          'div',
          { className: 'smart-modal ' + className },
          replace ? children : React.createElement(
            'div',
            { className: 'panel panel-default' },
            React.createElement(
              'div',
              { className: 'panel-heading' },
              header,
              React.createElement(
                'div',
                { onClick: this.close, className: 'close' },
                '×'
              )
            ),
            React.createElement(
              'div',
              { className: 'panel-body', scrollable: true },
              children
            ),
            footer && React.createElement(
              'div',
              { className: 'panel-footer', ref: 'footer' },
              footer
            )
          )
        )
      );
    }
  }]);
  return PureModal;
}(Component);

PureModal.defaultProps = {
  mode: 'modal',
  replace: false
};

PureModal.propTypes = {
  mode: PropTypes.oneOf(['modal', 'tooltip']),
  replace: PropTypes.bool,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default PureModal;