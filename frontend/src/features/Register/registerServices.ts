import { AuthContext, setToken } from 'common/contexts/AuthContext';
import { httpClient } from 'common/services/httpClient';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiEndpoints } from 'settings/api';
import { routes } from 'settings/routes';
import { TOKEN_COOKIE_NAME } from 'settings/variables';
import { RegisterFormValues, RegisterRequest, RegisterResponse } from './typings';

export const useRegisterServices = () => {
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    const register = (formValues: RegisterFormValues): Promise<void> => {
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
            .catch(error => {
                toast.error(error);
            });
    };

    return { register };
};
