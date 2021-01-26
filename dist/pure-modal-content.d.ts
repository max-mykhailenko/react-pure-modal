import React from 'react';
import type { MouseOrTouch } from './types';
declare type Props = {
    replace: boolean;
    children: JSX.Element;
    onDragStart?: (event: MouseOrTouch) => unknown;
    onDragEnd?: (event: MouseOrTouch) => unknown;
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
    bodyClass: string;
    header: JSX.Element | string;
    footer: JSX.Element | string;
    closeButton: JSX.Element | string;
    closeButtonPosition: string;
    draggable: boolean;
};
declare function PureModalContent(props: Props): JSX.Element;
declare namespace PureModalContent {
    var defaultProps: {
        closeButton: string;
        closeButtonPosition: string;
        replace: boolean;
        draggable: boolean;
    };
}
export default PureModalContent;
