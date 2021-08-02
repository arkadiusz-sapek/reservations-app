import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';

import { routes } from 'settings/routes';
import { UserRole } from 'common/typings/authTypings';
import { AuthContext } from 'common/contexts/AuthContext';
import { useReservationServices } from './reservationsServices';
import { BigCalendar } from './components/BigCalendar';
import { Reservation } from './reservationsTypings';
import * as S from './reservationsPageStyles';

export const ReservationsPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const {
        state: { user },
    } = useContext(AuthContext);

    const { getReservations } = useReservationServices();

    const getUserReservations = () => {
        setIsLoading(true);
        getReservations()
            .then(reservationsData => {
                setReservations(reservationsData);
            })
            .finally(() => setIsLoading(false));
    };

    // const verifyIfClientHaveCompany = () => {
    //     if (user?.role === UserRole.Client && !user.company) {
    //         history.push(routes.companies);
    //     }
    // };

    useEffect(() => {
        // verifyIfClientHaveCompany();
        getUserReservations();
    }, []);

    return (
        <>
            <div className="w-full">
                <BigCalendar reservations={reservations} />
            </div>
            <ClipLoader size={60} color="white" loading={isLoading} />
        </>
    );
};
