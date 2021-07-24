import styled from '@emotion/styled';

import { Button } from 'common/styled';
import { fontSize, fontWeight, palette } from 'settings/variables';

export const Header = styled.h1`
    font-size: ${fontSize.big};
    font-weight: ${fontWeight.demiBold};
    color: ${palette.primary.dark};
`;

export const Info = styled.p`
    width: 100%;
    padding: 1rem 0 1.2rem;
    font-size: ${fontSize.normal};
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
        boxShadow: '0px 0px 17px 1px rgba(0,0,0,0.32)',
    },
};
