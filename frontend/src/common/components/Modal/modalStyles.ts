import { palette } from 'settings/variables';

export const modalStyles = {
    // overlay: {
    //     zIndex: 0,
    // },
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
