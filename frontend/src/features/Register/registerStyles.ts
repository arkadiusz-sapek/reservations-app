import { makeStyles } from '@material-ui/core';

export const useChangePasswordStyles = makeStyles(() => ({
    form: {
        maxWidth: '25rem',
    },
    submitButton: {
        marginTop: '0.5rem',
        marginLeft: '0.5rem',
        width: '9.5rem',
        textAlign: 'center',
    },
    spinner: {
        marginLeft: '1rem',
    },
}));
