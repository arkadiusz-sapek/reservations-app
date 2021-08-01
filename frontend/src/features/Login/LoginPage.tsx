import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { routes } from 'settings/routes';
import { AuthPanelWrapper } from 'common/components/AuthPanelWrapper';
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
                    <div className="flex justify-end mt-8 ">
                        <Button color="primary" type="submit" data-testid="submitButton">
                            Log in
                            <div className="inline-block ml-2 w-1">
                                <ClipLoader size={15} color="white" loading={isLoading} />
                            </div>
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <div className="mt-6">
                You do not have account? <Link to={routes.registerPanel}>Sign in</Link>
            </div>
        </AuthPanelWrapper>
    );
};
