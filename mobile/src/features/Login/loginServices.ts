import { useContext } from 'react';

import { apiEndpoints } from '@mobile/settings/api';
// import { handleErrors } from 'common/helpers/errorsHandler';
import { httpClient } from '@mobile/common/services/httpClient';
import { LoginPageFormValues, LoginRequest, LoginResponse } from './typings';

export const useLoginServices = () => {
    // const { dispatch } = useContext(AuthContext);
    const login = (formValues: LoginPageFormValues) => {
        const request: LoginRequest = {
            email: formValues.email,
            password: formValues.password,
        };

        return httpClient
            .post<LoginResponse>(apiEndpoints.login, request)
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

    return { login };
};
