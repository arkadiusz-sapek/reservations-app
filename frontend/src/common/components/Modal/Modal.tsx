import React from 'react';
import ReactModal from 'react-modal';

import * as S from './modalStyles';

export interface Props {
    isOpen: boolean;
    handleAction?: () => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, children }: Props) => (
    <ReactModal isOpen={isOpen} style={S.modalStyles}>
        {children}
    </ReactModal>
);
