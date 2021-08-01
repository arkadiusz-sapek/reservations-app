import React from 'react';
// import { Button, FormGroup, Grid, Typography } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { getRequired } from 'common/helpers/validationHelpers';
// import { AuthPanelWrapper } from 'common/components/AuthPanelWrapper/AuthPanelWrapper';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { RegisterFormValues } from './typings';
import { useRegisterServices } from './registerServices';

const validationSchema = Yup.object().shape({
    email: getRequired('Email is required'),
    password: getRequired('Password is required')
        .min(8, 'Password should have at least 8 characters')
        .oneOf([Yup.ref('newPassword'), null], 'Password must match repeated password'),
});

export const RegisterPage = (): JSX.Element => {
    // const { register } = useRegisterServices();

    const formControl = useForm<RegisterFormValues>({
        resolver: yupResolver(validationSchema),
    });

    // const onSubmit = (data: RegisterFormValues) => register(data);

    return (
        <>
            {/* <Grid item>
                <Typography variant="h4" align="center" data-testid="header">
                    Wypełnij pola poniżej, aby utworzyć konto
                </Typography>
            </Grid>
            <Grid item>
                <FormProvider {...formControl}>
                    <form onSubmit={formControl.handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Grid container direction="column" spacing={2}>
                                <FormTextInput
                                    data-testid="emailInput"
                                    name="email"
                                    label="Email"
                                />
                                <FormTextInput
                                    data-testid="passwordInput"
                                    name="password"
                                    type="password"
                                    label="Hasło"
                                />
                            </Grid>
                        </FormGroup>
                        <Button
                            data-testid="submitButton"
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Utwórz konto
                        </Button>
                    </form>
                </FormProvider>
            </Grid> */}
        </>
    );
};
