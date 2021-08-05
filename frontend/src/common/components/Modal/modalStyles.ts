import { palette } from 'settings/variables';

export const modalStyles = {
    overlay: {
        zIndex: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        margin: 'auto',
        inset: 'auto',
        padding: '2rem',
        border: 'none',
        overflow: 'visible',
        boxShadow: palette.boxShadows.modal,
    },
};
