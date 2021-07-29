import styled from '@emotion/styled';

import { palette } from 'settings/variables';
import { Button } from 'common/styled';

export const Header = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.big};
    font-weight: ${({ theme }) => theme.fontWeight.demiBold};
    color: ${({ theme }) => theme.palette.primary.dark};
`;

export const Info = styled.p`
    width: 100%;
    padding: 1rem 0 1.2rem;
    font-size: ${({ theme }) => theme.fontSize.normal};
    text-align: center;
`;

export const ButtonRow = styled.div`
    display: flex;
`;

export const ActionButton = styled(Button)`
    width: 5rem;
    justify-content: center;

    :first-of-type {
        margin-right: 1.5rem;
    }
`;

export const modalStyles = {
    overlay: {
        zIndex: 1,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0 1rem 1rem',
        border: 'none',
        boxShadow: palette.boxShadows.modal,
    },
};
