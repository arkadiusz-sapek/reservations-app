// import { useHistory } from 'react-router-dom';
// import { useContext } from 'react';
import { toast } from 'react-toastify';

import { apiEndpoints } from 'settings/api';
// import { routes } from 'settings/routes';
// import { AuthorizationContext } from 'common/contexts/authContext';
import { httpClient } from 'common/services/httpClient';

import { LoginPageFormValues, LoginRequest, LoginResponse } from './typings';

export const useLoginServices = () => {
    // const history = useHistory();
    // const { setUserTypeAndToken } = useContext(AuthorizationContext);

    const login = (formValues: LoginPageFormValues) => {
        const request: LoginRequest = {
            email: formValues.email,
            password: formValues.password,
        };

        return (
            httpClient
                .post<LoginResponse>(apiEndpoints.login, request)
                .then(response => response.data.token)
                // .then(token => setUserTypeAndToken({ token }))
                // .then(() => history.push(routes.todoList))
                .catch(error => {
                    toast.error(error);
                })
        );
    };

    return { login };
};
