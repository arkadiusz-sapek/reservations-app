import React from 'react';
import Modal from 'react-modal';

import * as S from './confirmModalStyles';

export interface ConfirmModalProps {
    isOpen: boolean;
    setIsOpen: (modalState: boolean) => void;
    handleAction?: () => void;
    headerText?: string;
    text?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    headerText,
    text,
    setIsOpen,
    handleAction,
}) => {
    const closeModal = () => setIsOpen(false);

    const confirmHandler = () => {
        handleAction?.();
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} style={S.modalStyles}>
            <S.Header>{headerText}</S.Header>
            <S.Info>{text}</S.Info>
            <S.ButtonRow>
                <S.ActionButton onClick={confirmHandler} data-testid="modalConfirmButton">
                    Yes
                </S.ActionButton>
                <S.ActionButton onClick={closeModal} data-testid="modalCancelButton">
                    No
                </S.ActionButton>
            </S.ButtonRow>
        </Modal>
    );
};
