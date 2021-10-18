import { StyleSheet } from 'react-native';

import { palette } from '@mobile/settings/variables';

export const loginPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.background.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        marginBottom: 100,
    },
    inputView: {
        backgroundColor: palette.background.primary,
        borderRadius: 30,
        borderColor: palette.background.primary,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: palette.primary.main,
    },
    loginButtonText: {
        color: palette.primary.contrastText,
    },
});
