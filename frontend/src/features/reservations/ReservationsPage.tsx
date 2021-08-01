import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { useReservationServices } from './reservationsServices';

import * as S from './reservationsPageStyles';
import { BigCalendar } from './components/BigCalendar';
import { Reservation } from './reservationsTypings';

export const ReservationsPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { getReservationsRequest } = useReservationServices();

    useEffect(() => {
        setIsLoading(true);
        getReservationsRequest()
            .then(reservationsData => {
                setReservations(reservationsData);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <S.ReservationsPageWrapper>
            <div className="pr-4">{/* <SmallCalendar /> */}</div>

            <div className="w-full">
                <BigCalendar reservations={reservations} />
            </div>
            <ClipLoader size={60} color="white" loading={isLoading} />
        </S.ReservationsPageWrapper>
    );
};
