import { useHistory } from 'react-router-dom';

import { AuthContext } from 'common/contexts/AuthContext';
import { UserRole } from 'common/typings/authTypings';
import { useUserServices } from 'core/services/userServices';
import React, { useContext, useEffect, useState } from 'react';
import { routes } from 'settings/routes';

interface Props {
    userRoles: UserRole[];
    children: React.ReactNode;
}

export const AuthGuard = ({ userRoles, children }: Props) => {
    const history = useHistory();
    const [isVerified, setIsVerified] = useState(false);

    const {
        state: { token },
    } = useContext(AuthContext);

    const { getUserData } = useUserServices();

    const verifyUser = () => {
        if (!token) {
            history.push(routes.loginPanel);

            return;
        }
        getUserData().then(user => {
            if (!userRoles.includes(user.role)) {
                history.push(routes.reservations);
            }

            setIsVerified(true);
        });
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return <>{children}</>;
};
