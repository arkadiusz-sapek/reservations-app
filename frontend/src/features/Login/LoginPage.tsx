import React from 'react';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormTextInput } from 'common/components/form/FormTextInput';
import { getRequired } from 'common/helpers/validationHelpers';
import { Button } from 'common/styled';

import { LoginPageFormValues } from './typings';
import { useLoginServices } from './loginServices';

const validationSchema = Yup.object().shape({
    email: getRequired('Email'),
    password: getRequired('Password'),
});

export const LoginPage = (): JSX.Element => {
    const { login } = useLoginServices();

    const formControl = useForm<LoginPageFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (loginPageFormValues: LoginPageFormValues) => login(loginPageFormValues);

    return (
        <>
            <FormProvider {...formControl}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <FormTextInput name="email" label="Email" />
                    <FormTextInput name="password" label="Hasło" type="password" />
                    <Button color="primary" type="submit" data-testid="submitButton">
                        Zaloguj
                    </Button>
                </form>
            </FormProvider>
        </>
    );
};
