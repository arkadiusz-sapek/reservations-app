import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { TOKEN_COOKIE_NAME } from 'settings/variables';
import { apiEndpoints } from 'settings/api';
import { routes } from 'settings/routes';
import { httpClient } from 'common/services/httpClient';
import { LoginPageFormValues, LoginRequest, LoginResponse } from './typings';

export const useLoginServices = () => {
    const history = useHistory();

    const login = (formValues: LoginPageFormValues) => {
        const request: LoginRequest = {
            email: formValues.email,
            password: formValues.password,
        };

        return httpClient
            .post<LoginResponse>(apiEndpoints.login, request)
            .then(response => response.data.token)
            .then(token => Cookies.set(TOKEN_COOKIE_NAME, token))
            .then(() => history.push(routes.reservations))
            .catch(error => {
                toast.error(error);
            });
    };

    return { login };
};
