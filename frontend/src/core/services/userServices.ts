import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { apiEndpoints } from 'settings/api';
import { routes } from 'settings/routes';
import { httpClient } from 'common/services/httpClient';
import { User, UserRole } from 'common/typings/authTypings';
import { AuthContext, setUserData } from 'common/contexts/AuthContext';

export const useUserServices = () => {
    const history = useHistory();

    const { dispatch } = useContext(AuthContext);

    const getUserData = async () =>
        httpClient
            .get<User>(apiEndpoints.me)
            .then(response => response.data)
            .then(user => {
                dispatch(setUserData(user));
                const route =
                    user.role === UserRole.Client && !user.company
                        ? routes.companyForm
                        : routes.reservations;

                history.push(route);

                return user;
            });

    const getAllUsers = async (role: UserRole) =>
        httpClient
            .get<User[]>(`${apiEndpoints.users}?role=${role}`)
            .then(response => response.data);

    return { getUserData, getAllUsers };
};
