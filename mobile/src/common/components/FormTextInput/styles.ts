import { StyleSheet } from 'react-native';

import { palette } from '@mobile/settings/variables';

export const formTextInputStyles = StyleSheet.create({
    inputView: {
        borderRadius: 30,
        borderColor: palette.background.primary,
        width: '70%',
        height: 80,
        marginBottom: 20,
    },
    input: {
        height: 100,
        flex: 1,
        fontSize: 16,
        background: 'blue',
        borderColor: 'black',
        borderBottomWidth: 1,
    },
});
