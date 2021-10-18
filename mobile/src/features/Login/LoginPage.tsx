import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FormTextInput } from "@mobile/common/components/FormTextInput";
import { RootStackParamList } from "@mobile/common/typings/navigationTypings";

import { loginPageStyles as styles } from "./styles";
import { LoginPageFormValues } from "./typings";
import { useLoginServices } from "./loginServices";

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginPage(props: NativeStackScreenProps<RootStackParamList>) {
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useLoginServices();

    const formControl = useForm<LoginPageFormValues>({ resolver: yupResolver(validationSchema), });

    const onSubmit = (loginPageFormValues: LoginPageFormValues) => {
        setIsLoading(true);
        console.log(loginPageFormValues)
        login(loginPageFormValues).then(() => {
            setIsLoading(false);
            props.navigation.navigate('Reservations')
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <View style={styles.container}>
            <FormProvider {...formControl}>
                <Text style={styles.title}>Reservations App</Text>
                <Text >If you have don't have account</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                    <Text >Create account</Text>
                </TouchableOpacity>
                <FormTextInput name="email" label="Email" placeholder="example@email.com" />
                <FormTextInput name="password" label="Password" secureTextEntry placeholder="Must have at least 6 characters" />

                <TouchableOpacity style={styles.loginBtn} onPress={formControl.handleSubmit(onSubmit)}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </FormProvider>
        </View>
    );
}

