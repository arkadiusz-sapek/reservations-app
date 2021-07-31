import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiEndpoints } from 'settings/apiConfig';
import { apiClient } from 'common/services/apiClient';
import { routes } from 'settings/routes';
import { RegisterFormValues, RegisterRequest, RegisterResponse } from './typings';

export const useRegisterServices = () => {
    const history = useHistory();

    const register = (formValues: RegisterFormValues): Promise<void> => {
        const createAccountRequest: RegisterRequest = {
            email: formValues.email,
            password: formValues.password,
        };

        return apiClient
            .post<RegisterResponse>(apiEndpoints.register, createAccountRequest)
            .then(() => history.push(routes.todoList))
            .then(() => {
                toast.success(
                    'Konto utworzone pomyślnie. Link aktywacyjny został wysłany na Twój adres email.',
                    { autoClose: false },
                );
            })
            .catch(error => {
                toast.error(error);
            });
    };

    return { register };
};
