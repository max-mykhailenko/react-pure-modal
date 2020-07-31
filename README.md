# react-pure-modal [![npm package](https://img.shields.io/npm/v/react-pure-modal.svg?style=flat-square)](https://www.npmjs.org/package/react-pure-modal) [![Build Status](https://travis-ci.org/memCrab/react-pure-modal.svg?branch=master)](https://travis-ci.org/memCrab/react-pure-modal) [![Dependency Status](https://david-dm.org/memCrab/react-pure-modal.svg)](https://david-dm.org/memCrab/react-pure-modal)
[![NPM](https://nodei.co/npm/react-pure-modal.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-pure-modal/)

React pure modal is a simplest way to create dialog on your site.
- Very small (less than 4Kb)
- Mobile friendly
- Without dependencies

## Screencast
### Simple
![Simple demo](./screencast/simple.gif)
### With inner scrolling
![Scrollable demo](./screencast/scrollable.gif)

## Installation
`npm i -S react-pure-modal`

## Usage
```jsx
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

const [modal, setModal] = useState(false);

<PureModal
  header="Your header"
  footer={<div><button>Cancel</button><button>Save</button></div>}
  isOpen={modal}
  closeButton='close'
  closeButtonPosition='bottom'
  onClose={() => {
    setModal(false)
    return true;
    }}
>
  <p>Your content</p>
</PureModal>
```

And open with

`<button className="button" onClick={() => setModal(true)}>Open simple modal</button>`

## Options

#### replace `boolean` (default: false)
Replace all inner markup with Component children
#### isOpen: `boolean`
Control modal state from parent component
#### scrollable: `boolean` (default: true)
You can disable scroll in modal body
#### draggable: `boolean` (default: false)
You can drag a modal window
#### onClose: `Function`
Handle modal closing. Should return true if you allow closing
#### className: `string`
ClassName for modal DOM element, can be used for set modal width or change behaviour on mobile devices
#### width: `string` (example '200px')
Width in pixels, em's, vw etc
#### header: `JSX.Element | string`
Modal heading, doesn't disabled close button
#### footer: `JSX.Element | string`
Place here your actions
#### closeButton: `(JSX.Element & string)`
Content of your closing button
#### closeButtonPosition: `string`
Place closing button under your modal or inside header. Allowed options: 'header' | 'bottom'

## Changelog (latest on top)
   - Drag and drop
   - fix bug in firefox and safari with modal position
   - set width as atribute
   - new default aligning to the screen center!
   - prevent of modal closing if ESC pressed in editable element
   - now with minified css!
   - styles are more impressive now, good mobile support
   - now scrollable can be false
   - remove dependencies, rewrite open and close logic, fix linting
   - new header logic and breaking classes changes

## Developing
   - `npm install`
   - `npm run webpack:dev -- --watch`
   - `npm run webpack:prod -- --watch`
   - `npm run test:dev`
   - Open `index.html` from examples
