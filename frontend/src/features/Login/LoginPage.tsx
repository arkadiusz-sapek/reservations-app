import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import { routes } from 'settings/routes';
import { LoadingButton } from 'common/components/LoadingButton';
import { FormActionsWrapper } from 'common/components/form/FormActionsWrapper';
import { AuthPanelWrapper } from 'common/components/AuthPanelWrapper';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { getRequired } from 'common/helpers/validationHelpers';
import { LoginPageFormValues } from './typings';
import { useLoginServices } from './loginServices';

const validationSchema = Yup.object().shape({
    email: getRequired('Email'),
    password: getRequired('Password'),
});

export const LoginPage = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useLoginServices();

    const formControl = useForm<LoginPageFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (loginPageFormValues: LoginPageFormValues) => {
        setIsLoading(true);
        login(loginPageFormValues).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <AuthPanelWrapper headerText="Log in panel">
            <FormProvider {...formControl}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <FormTextInput name="email" label="Email" />
                    <FormTextInput name="password" label="Password" type="password" />
                    <FormActionsWrapper>
                        <LoadingButton isLoading={isLoading}>Log in</LoadingButton>
                    </FormActionsWrapper>
                </form>
            </FormProvider>
            <div className="mt-6">
                You do not have account? <Link to={routes.registerPanel}>Sign in</Link>
            </div>
        </AuthPanelWrapper>
    );
};
