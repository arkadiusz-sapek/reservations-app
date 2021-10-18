import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import { FormTextInput } from "@mobile/common/components/FormTextInput";


import { loginPageStyles as styles } from "./styles";
import { LoginPageFormValues } from "./typings";
import { useLoginServices } from "./loginServices";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useLoginServices();

    const formControl = useForm<LoginPageFormValues>();

    const onSubmit = (loginPageFormValues: LoginPageFormValues) => {
        setIsLoading(true);
        console.log(loginPageFormValues)
        login(loginPageFormValues).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <View style={styles.container}>
            <FormProvider {...formControl}>
                <Text style={styles.title}>Reservations App</Text>

                <FormTextInput name="email" label="Email" placeholder="example@email.com" />
                <FormTextInput name="password" label="Password" placeholder="Must have at least 6 characters" />

                <TouchableOpacity style={styles.loginBtn} onPress={formControl.handleSubmit(onSubmit)}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </FormProvider>
        </View>
    );
}

