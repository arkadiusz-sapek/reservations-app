import { AuthContext, setToken } from 'common/contexts/AuthContext';
import { handleErrors } from 'common/helpers/errorsHandler';
import { httpClient } from 'common/services/httpClient';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { apiEndpoints } from 'settings/api';
import { routes } from 'settings/routes';
import { TOKEN_COOKIE_NAME } from 'settings/variables';
import { RegisterFormValues, RegisterRequest, RegisterResponse } from './typings';

export const useRegisterServices = () => {
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    const register = (formValues: RegisterFormValues) => {
        const createAccountRequest: RegisterRequest = {
            email: formValues.email,
            password: formValues.password,
            role: formValues.role.value.toString(),
        };

        return httpClient
            .post<RegisterResponse>(apiEndpoints.register, createAccountRequest)
            .then(({ data }) => {
                dispatch(setToken(data.token));
                Cookies.set(TOKEN_COOKIE_NAME, data.token);
                history.push(routes.reservations);
            })
            .catch(handleErrors);
    };

    return { register };
};
