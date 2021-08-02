import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';
import { routes } from 'settings/routes';
import { getRequired } from 'common/helpers/validationHelpers';
import { AuthPanelWrapper } from 'common/components/AuthPanelWrapper';
import { Button } from 'common/styled';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { FormSelect } from 'common/components/form/FormSelect';
import { UserRole } from 'common/typings/authTypings';
import { useRegisterServices } from './registerServices';
import { RegisterFormValues } from './typings';

const validationSchema = Yup.object().shape({
    email: getRequired('Email'),
    // role: getRequired('Role'),
    // password: getRequired('Password').min(8, 'Password should have at least 8 characters'),
    // repeatedPassword: getRequired('Password repetition').oneOf(
    //     [Yup.ref('newPassword'), null],
    //     'Passwords are different',
    // ),
});

export const RegisterPage = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useRegisterServices();

    const formControl = useForm<RegisterFormValues>({
        resolver: yupResolver(validationSchema),
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
                    <FormSelect
                        name="role"
                        label="Role"
                        options={[
                            {
                                label: 'Client',
                                value: UserRole.Client,
                            },
                            {
                                label: 'Consultant',
                                value: UserRole.Consultant,
                            },
                        ]}
                    />
                    <FormTextInput name="password" label="Password" type="password" />
                    <FormTextInput
                        name="passwordRepetition"
                        label="Password repetition"
                        type="password"
                    />

                    <div className="flex justify-end mt-8 ">
                        <Button color="primary" type="submit" data-testid="submitButton">
                            Sign in
                            <div className="inline-block ml-2 w-1">
                                <ClipLoader size={15} color="white" loading={isLoading} />
                            </div>
                        </Button>
                    </div>
                </form>
            </FormProvider>
            <div className="mt-6">
                You already have account? <Link to={routes.loginPanel}>Log in</Link>
            </div>
        </AuthPanelWrapper>
    );
};
