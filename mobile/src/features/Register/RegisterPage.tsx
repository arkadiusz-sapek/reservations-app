import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import { FormTextInput } from "@mobile/common/components/FormTextInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@mobile/common/typings/navigationTypings";

import { loginPageStyles as styles } from "./styles";
import { RegisterFormValues } from "./typings";
import { useRegisterServices } from "./registerServices";

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should have at least 8 characters'),
    passwordRepetition: Yup.string().required('Password repetition is required').oneOf(
        [Yup.ref('password'), null],
        'Passwords are different',
    ),
});

export default function RegisterPage(props: NativeStackScreenProps<RootStackParamList>) {
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useRegisterServices();

    const formControl = useForm<RegisterFormValues>({ resolver: yupResolver(validationSchema) });

    const onSubmit = (registerFormValues: RegisterFormValues) => {
        setIsLoading(true);
        console.log(registerFormValues)
        register(registerFormValues).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <View style={styles.container}>
            <FormProvider {...formControl}>
                <Text style={styles.title}>Reservations App</Text>

                <Text >If you already have account</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                    <Text >Go to log in</Text>
                </TouchableOpacity>

                <FormTextInput name="email" label="Email" placeholder="example@email.com" />
                <FormTextInput name="password" label="Password" placeholder="Must have at least 6 characters" />
                <FormTextInput name="passwordRepetition" label="Password repetition" placeholder="Must be the same as password" />

                <TouchableOpacity style={styles.loginBtn} onPress={formControl.handleSubmit(onSubmit)}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </FormProvider>
        </View>
    );
}

