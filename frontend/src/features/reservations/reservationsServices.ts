import { apiEndpoints } from 'settings/api';

import { httpClient } from 'common/services/httpClient';
import { Reservation } from './reservationsTypings';

export const useReservationServices = () => {
    const getReservationsRequest = (): Promise<Reservation[]> =>
        httpClient.get<Reservation[]>(apiEndpoints.reservations).then(({ data }) => data);

    return { getReservationsRequest };
};
