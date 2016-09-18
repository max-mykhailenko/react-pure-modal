# react-pure-modal
React pure modal is a simplest way to create dialog on your site.
- Very small (less than 4Kb)
- Mobile friendly
- Without dependencies

## Installation
`npm install --save-dev react-pure-modal`

## Usage
```jsx
import PureModal from 'react-pure-modal';
import 'react-pure-modal/src/react-pure-modal.css';

<PureModal
  header="Your header"
  footer={<div><button>Cancel</button><button>Save</button></div>}
  onClose={() => {
    console.log('handle closing');
    return true;
  }}
  isOpen
  ref="modal"
>
  <p>Your content</p>
</PureModal>
```

And open with

`<button onClick={() => this.refs.modal.open() }>Open modal</button>`

## Options

#### replace `PropTypes.bool` (default: false)
Replace all inner markup with Component children
#### isOpen: `PropTypes.bool`
Control modal state from parent component
#### scrollable: `PropTypes.bool` (default: true)
You can disable scroll in modal body
#### onClose: `PropTypes.func`
Handle modal closing. Should return true if you allow closing
#### className: `PropTypes.string`
ClassName for modal DOM element, can be used for set modal width or change behaviour on mobile devices
#### header: `PropTypes.oneOfType([ PropTypes.node, PropTypes.string ])`
Modal heading, doesn't disabled close button
#### footer: `PropTypes.oneOfType([ PropTypes.node, PropTypes.string ])`
Place here your actions


## Screencast
### Simple
![Simple demo](./screencast/simple.gif)
### With inner scrolling
![Scrollable demo](./screencast/scrollable.gif)
