'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var keymage = require('keymage');
var uniqueId = require('lodash/uniqueId');

var PureModal = function (_React$Component) {
  _inherits(PureModal, _React$Component);

  function PureModal(props) {
    _classCallCheck(this, PureModal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PureModal).call(this, props));

    _this.isOpen = props.isOpen || false;
    _this.close = _this.close.bind(_this);
    _this.open = _this.open.bind(_this);
    _this.handleBackdropClick = _this.handleBackdropClick.bind(_this);
    _this.scope = uniqueId('modal-');
    return _this;
  }

  _createClass(PureModal, [{
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
        if (!event.target.classList.contains('modal-backdrop')) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();
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
              { className: 'panel-body scrollable' },
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
}(React.Component);

PureModal.defaultProps = {
  mode: 'modal',
  replace: false
};

PureModal.propTypes = {
  mode: React.PropTypes.oneOf(['modal', 'tooltip']),
  replace: React.PropTypes.bool,
  children: React.PropTypes.node,
  isOpen: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  className: React.PropTypes.string,
  header: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]),
  footer: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string])
};

exports.default = PureModal;