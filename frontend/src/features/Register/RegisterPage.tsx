import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { routes } from 'settings/routes';
import { getRequired } from 'common/helpers/validationHelpers';
import { AuthPanelWrapper } from 'common/components/AuthPanelWrapper';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { FormSelect } from 'common/components/form/FormSelect';
import { UserRole } from 'common/typings/authTypings';
import { FormActionsWrapper } from 'common/components/form/FormActionsWrapper';
import { LoadingButton } from 'common/components/LoadingButton';
import { useRegisterServices } from './registerServices';
import { RegisterFormValues } from './typings';

const roleOptions = [
    {
        label: 'Client',
        value: UserRole.Client,
    },
    {
        label: 'Consultant',
        value: UserRole.Consultant,
    },
];

const validationSchema = Yup.object().shape({
    email: getRequired('Email'),
    password: getRequired('Password').min(8, 'Password should have at least 8 characters'),
    passwordRepetition: getRequired('Password repetition').oneOf(
        [Yup.ref('password'), null],
        'Passwords are different',
    ),
});

export const RegisterPage = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useRegisterServices();

    const formControl = useForm<RegisterFormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            role: roleOptions[0],
        },
    });

    const onSubmit = (data: RegisterFormValues) => {
        setIsLoading(true);
        register(data).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <AuthPanelWrapper headerText="Sign in panel">
            <FormProvider {...formControl}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <FormTextInput name="email" label="Email" />
                    <FormSelect name="role" label="Role" options={roleOptions} />
                    <FormTextInput
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                    />
                    <FormTextInput
                        name="passwordRepetition"
                        label="Password repetition"
                        type="password"
                    />

                    <FormActionsWrapper>
                        <LoadingButton isLoading={isLoading}>Sign in</LoadingButton>
                    </FormActionsWrapper>
                </form>
            </FormProvider>
            <div className="mt-6">
                You already have account? <Link to={routes.loginPanel}>Log in</Link>
            </div>
        </AuthPanelWrapper>
    );
};
