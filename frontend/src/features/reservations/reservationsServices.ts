import { apiEndpoints } from 'settings/api';
import { httpClient } from 'common/services/httpClient';
import { CreateReservationRequest, Reservation } from './reservationsTypings';

export const useReservationServices = () => {
    const getReservations = (): Promise<Reservation[]> =>
        httpClient.get<Reservation[]>(apiEndpoints.reservations).then(({ data }) => data);

    const createReservation = (reservation: CreateReservationRequest): Promise<Reservation> =>
        httpClient
            .post<Reservation>(apiEndpoints.reservations, reservation)
            .then(({ data }) => data);

    return { getReservations, createReservation };
};
