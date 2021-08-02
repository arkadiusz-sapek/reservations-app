import { useContext } from 'react';

import { apiEndpoints } from 'settings/api';
import { httpClient } from 'common/services/httpClient';
import { AuthContext } from 'common/contexts/AuthContext';
import {
    CreateReservationRequest,
    Reservation,
    ReservationFormValues,
} from './reservationsTypings';

export const useReservationServices = () => {
    const {
        state: { user },
    } = useContext(AuthContext);

    const getReservations = (): Promise<Reservation[]> =>
        httpClient.get<Reservation[]>(apiEndpoints.reservations).then(({ data }) => data);

    const transformFormValuesToRequest = ({
        startDate,
        startTime,
        endDate,
        endTime,
        company,
        ...formValues
    }: ReservationFormValues): CreateReservationRequest => ({
        ...formValues,
        startDate: `${startDate} ${startTime}`,
        endDate: `${endDate} ${endTime}`,
        user: user?.id || '-1',
        company: company.value.toString(),
    });

    const createReservationForConsultant = (
        reservation: ReservationFormValues,
    ): Promise<Reservation> => {
        const requestData = transformFormValuesToRequest(reservation);

        return httpClient
            .post<Reservation>(apiEndpoints.reservations, requestData)
            .then(({ data }) => data);
    };

    return { getReservations, createReservationForConsultant };
};
