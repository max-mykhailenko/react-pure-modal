import React from 'react';
import { render } from 'react-dom';
import PureModal from '../dist/react-pure-modal.min.js';
import '../dist/react-pure-modal.min.css';

class ModalContainer extends React.Component {
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.modal.open()}>Open simple modal</button>
        <button className="button" onClick={() => this.modalInnerScroll.open()}>Open modal with inner scroll</button>
        <button className="button" onClick={() => this.modalCenter.open()}>Open small modal on center scrollable or not</button>

        <PureModal
          header="Custom heading"
          footer="Buttons?"
          ref={(k) => this.modalInnerScroll = k}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla ex a feugiat blandit. Sed tempor placerat dui et hendrerit. Nunc fringilla vel orci at lacinia. Duis vitae nulla sit amet justo faucibus ornare. Nunc nec lacinia dolor. Vestibulum egestas condimentum ante, id semper sem facilisis eu. Sed aliquam eget est eget finibus. Quisque vehicula massa et elit maximus, vel euismod erat lacinia. Morbi ut risus eget nunc feugiat cursus.</p>
          <p>Pellentesque quis metus eu urna feugiat auctor. Fusce accumsan mi nibh, porttitor lacinia est egestas vel. Maecenas nibh odio, volutpat quis tincidunt eget, lacinia a lorem. Etiam ullamcorper turpis a ultrices auctor. Cras quis tortor turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam porta sagittis congue. Maecenas volutpat lacus eu lectus dapibus, nec eleifend ipsum luctus. Etiam ac lobortis ligula, id porta lectus. Curabitur eget leo ut sapien ullamcorper sagittis.</p>
          <p>Suspendisse commodo nisl in neque tempus pellentesque. Nullam magna turpis, fringilla sollicitudin maximus non, consectetur ac quam. Ut sit amet tortor ornare, tincidunt ante non, tempor mauris. Proin vestibulum purus vel felis pellentesque varius. Sed eget volutpat dui. Curabitur quis nunc facilisis, euismod justo placerat, sagittis nunc. Phasellus sagittis felis urna, sed sodales odio auctor sit amet. Etiam id metus quis velit ullamcorper consequat. Fusce posuere ultricies felis, at vestibulum turpis egestas et.</p>
          <p>In hac habitasse platea dictumst. Quisque fringilla elit vel ante tristique, quis commodo turpis tincidunt. Phasellus mi sapien, lobortis sed blandit quis, suscipit ut odio. Vivamus venenatis arcu nulla, non molestie ipsum ullamcorper eu. Duis suscipit sollicitudin purus, eu consequat magna fringilla eget. Sed a varius dui. Donec at nisi tortor. Vivamus ultrices risus eu maximus fermentum. Curabitur et tempus turpis. Curabitur tincidunt porttitor imperdiet. Pellentesque hendrerit finibus mi, et rhoncus ex vestibulum nec. Integer fermentum quis elit eget faucibus.</p>
          <p>Ut bibendum dolor a mi ultrices venenatis ac a mi. Sed imperdiet ipsum sodales odio scelerisque, vel lobortis est rutrum. Sed sagittis iaculis lorem id mattis. Sed ultricies condimentum rhoncus. Phasellus rhoncus turpis nec odio egestas, quis pellentesque quam aliquam. In sodales erat iaculis libero molestie, vel commodo nisl congue. Maecenas scelerisque, ligula et elementum sagittis, felis dui semper tortor, eget euismod enim enim vitae ante. Nullam suscipit accumsan mi non blandit. Curabitur viverra risus sed feugiat aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ipsum diam, pulvinar sit amet lectus at, congue vulputate eros. Donec id libero quam.</p>
        </PureModal>
        <PureModal
          header="Custom heading"
          footer="Buttons?"
          width="800px"
          scrollable={false}
          ref={(k) => this.modal = k}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla ex a feugiat blandit. Sed tempor placerat dui et hendrerit. Nunc fringilla vel orci at lacinia. Duis vitae nulla sit amet justo faucibus ornare. Nunc nec lacinia dolor. Vestibulum egestas condimentum ante, id semper sem facilisis eu. Sed aliquam eget est eget finibus. Quisque vehicula massa et elit maximus, vel euismod erat lacinia. Morbi ut risus eget nunc feugiat cursus.</p>
          <p>Pellentesque quis metus eu urna feugiat auctor. Fusce accumsan mi nibh, porttitor lacinia est egestas vel. Maecenas nibh odio, volutpat quis tincidunt eget, lacinia a lorem. Etiam ullamcorper turpis a ultrices auctor. Cras quis tortor turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam porta sagittis congue. Maecenas volutpat lacus eu lectus dapibus, nec eleifend ipsum luctus. Etiam ac lobortis ligula, id porta lectus. Curabitur eget leo ut sapien ullamcorper sagittis.</p>
          <p>Suspendisse commodo nisl in neque tempus pellentesque. Nullam magna turpis, fringilla sollicitudin maximus non, consectetur ac quam. Ut sit amet tortor ornare, tincidunt ante non, tempor mauris. Proin vestibulum purus vel felis pellentesque varius. Sed eget volutpat dui. Curabitur quis nunc facilisis, euismod justo placerat, sagittis nunc. Phasellus sagittis felis urna, sed sodales odio auctor sit amet. Etiam id metus quis velit ullamcorper consequat. Fusce posuere ultricies felis, at vestibulum turpis egestas et.</p>
          <p>In hac habitasse platea dictumst. Quisque fringilla elit vel ante tristique, quis commodo turpis tincidunt. Phasellus mi sapien, lobortis sed blandit quis, suscipit ut odio. Vivamus venenatis arcu nulla, non molestie ipsum ullamcorper eu. Duis suscipit sollicitudin purus, eu consequat magna fringilla eget. Sed a varius dui. Donec at nisi tortor. Vivamus ultrices risus eu maximus fermentum. Curabitur et tempus turpis. Curabitur tincidunt porttitor imperdiet. Pellentesque hendrerit finibus mi, et rhoncus ex vestibulum nec. Integer fermentum quis elit eget faucibus.</p>
          <p>Ut bibendum dolor a mi ultrices venenatis ac a mi. Sed imperdiet ipsum sodales odio scelerisque, vel lobortis est rutrum. Sed sagittis iaculis lorem id mattis. Sed ultricies condimentum rhoncus. Phasellus rhoncus turpis nec odio egestas, quis pellentesque quam aliquam. In sodales erat iaculis libero molestie, vel commodo nisl congue. Maecenas scelerisque, ligula et elementum sagittis, felis dui semper tortor, eget euismod enim enim vitae ante. Nullam suscipit accumsan mi non blandit. Curabitur viverra risus sed feugiat aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ipsum diam, pulvinar sit amet lectus at, congue vulputate eros. Donec id libero quam.</p>
        </PureModal>
      <PureModal
          header="Custom heading"
          footer="Buttons?"
          scrollable={false}
          ref={(k) => this.modalCenter = k}
        >
          <p>Center</p>
        </PureModal>
      </div>
    );
  }
}

render(<ModalContainer />, document.getElementById('js--modals'));
