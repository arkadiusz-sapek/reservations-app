import React from 'react';

import { useFormContext, Controller, ControllerProps } from 'react-hook-form';
import {
    Text, View, TextInput
} from "react-native";
import { formTextInputStyles as styles } from './styles';

interface Props extends Omit<ControllerProps, 'render'> {
    label: string;
    autoComplete?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    children?: React.ReactNode;
}

export const FormTextInput = ({
    placeholder,
    secureTextEntry,
    ...props
}: Props): JSX.Element => {
    const { control, formState } = useFormContext();

    const fieldErrors = formState.errors?.[props.name];
    console.log('dupa')
    return (
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <View style={styles.inputView}>
                    <Text>{props.label}</Text>
                    <TextInput
                        style={styles.input}
                        value={value || ''}
                        onChangeText={(text) => { onChange(text) }}
                        secureTextEntry={secureTextEntry}
                        data-testid={`${props.name}Input`}
                        placeholder={placeholder}
                    />

                    <Text>{fieldErrors?.message}</Text>
                </View>
            )}
            {...props}
        />
    );
};
