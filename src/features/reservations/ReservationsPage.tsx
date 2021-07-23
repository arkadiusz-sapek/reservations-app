import React, { useEffect, useState } from 'react';

import { CompanyColumn } from './components/CompanyColumn';
import { useReservationServices } from './reservationsServices';
import { Company } from './reservationsTypings';
import * as S from './reservationsPageStyles';

export const ReservationsPage = () => {
    const [reservations, setReservations] = useState<Company[]>([]);

    const { getReservationsRequest } = useReservationServices();

    useEffect(() => {
        getReservationsRequest().then(reservationsData => {
            setReservations(reservationsData);
        });
    }, []);

    return (
        <S.ReservationsWrapper>
            {reservations.map(company => (
                <CompanyColumn key={company.id} company={company} />
            ))}
        </S.ReservationsWrapper>
    );
};
