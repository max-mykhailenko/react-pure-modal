import './react-pure-modal.css';
declare type Props = {
    children: JSX.Element;
    replace: boolean;
    className: string;
    header: JSX.Element | string;
    footer: JSX.Element | string;
    scrollable: boolean;
    draggable: boolean;
    width: string;
    isOpen: boolean;
    onClose: Function;
    closeButton: JSX.Element | string;
    closeButtonPosition: string;
    portal: boolean;
};
declare function PureModal(props: Props): JSX.Element | null;
export default PureModal;
