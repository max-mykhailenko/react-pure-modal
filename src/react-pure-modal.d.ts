import './react-pure-modal.css';
declare type Props = {
    mode: 'modal' | 'tooltip';
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
    closeButton: JSX.Element & string;
    closeButtonPosition: string;
    portal: boolean;
} & typeof defaultProps;
declare const defaultProps: {
    mode: string;
    replace: boolean;
    scrollable: boolean;
    draggable: boolean;
    portal: boolean;
};
declare function PureModal(props: Props): JSX.Element | null;
declare namespace PureModal {
    var defaultProps: {
        mode: string;
        replace: boolean;
        scrollable: boolean;
        draggable: boolean;
        portal: boolean;
    };
}
export default PureModal;
