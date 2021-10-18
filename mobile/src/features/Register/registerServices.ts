import { useContext } from 'react';

import { apiEndpoints } from '@mobile/settings/api';
// import { handleErrors } from 'common/helpers/errorsHandler';
import { httpClient } from '@mobile/common/services/httpClient';
import { RegisterFormValues, RegisterRequest, RegisterResponse } from './typings';

export const useRegisterServices = () => {
    // const { dispatch } = useContext(AuthContext);
    const register = (formValues: RegisterFormValues) => {
        const createAccountRequest: RegisterRequest = {
            email: formValues.email,
            password: formValues.password,
            role: 'CLIENT',
        };

        return httpClient
            .post<RegisterResponse>(apiEndpoints.register, createAccountRequest)
            .then(response => response.data.token)
            .then(token => {
                // dispatch(setToken(token));
                // Cookies.set(TOKEN_COOKIE_NAME, token);
                console.log('hejo');
                console.log(token);
                // history.push(routes.reservations);
            });
        // .catch(handleErrors);
    };

    return { register };
};
