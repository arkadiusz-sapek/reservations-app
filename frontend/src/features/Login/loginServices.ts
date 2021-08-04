import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { TOKEN_COOKIE_NAME } from 'settings/variables';
import { apiEndpoints } from 'settings/api';
import { routes } from 'settings/routes';
import { AuthContext, setToken } from 'common/contexts/AuthContext';
import { handleErrors } from 'common/helpers/errorsHandler';
import { httpClient } from 'common/services/httpClient';
import { LoginPageFormValues, LoginRequest, LoginResponse } from './typings';

export const useLoginServices = () => {
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);
    const login = (formValues: LoginPageFormValues) => {
        const request: LoginRequest = {
            email: formValues.email,
            password: formValues.password,
        };

        return httpClient
            .post<LoginResponse>(apiEndpoints.login, request)
            .then(response => response.data.token)
            .then(token => {
                dispatch(setToken(token));
                Cookies.set(TOKEN_COOKIE_NAME, token);
                history.push(routes.reservations);
            })
            .catch(handleErrors);
    };

    return { login };
};
