import { useContext } from 'react';

import { apiEndpoints } from 'settings/api';
import { httpClient } from 'common/services/httpClient';
import { AuthContext } from 'common/contexts/AuthContext';
import { handleErrors } from 'common/helpers/errorsHandler';
import {
    CreateReservationRequest,
    Reservation,
    ConsultantReservationFormValues,
    CompanyReservationFormValues,
} from './reservationsTypings';

export const useReservationServices = () => {
    const {
        state: { user },
    } = useContext(AuthContext);

    const getReservations = (): Promise<Reservation[]> =>
        httpClient.get<Reservation[]>(apiEndpoints.reservations).then(({ data }) => data);

    const transformFormValuesToClientRequest = ({
        date,
        startTime,
        endTime,
        company,
        ...formValues
    }: ConsultantReservationFormValues): CreateReservationRequest => ({
        ...formValues,
        startDate: `${date} ${startTime}`,
        endDate: `${date} ${endTime}`,
        user: user?.id || -1,
        company: parseInt(company.value.toString(), 10),
    });

    const transformFormValuesToCompanyRequest = ({
        date,
        startTime,
        endTime,
        consultant,
        ...formValues
    }: CompanyReservationFormValues): CreateReservationRequest => ({
        ...formValues,
        startDate: `${date} ${startTime}`,
        endDate: `${date} ${endTime}`,
        user: user?.id || -1,
        company: parseInt(consultant.value.toString(), 10),
    });

    const createReservationForConsultant = (reservation: ConsultantReservationFormValues) => {
        const requestData = transformFormValuesToClientRequest(reservation);

        return httpClient
            .post<Reservation>(apiEndpoints.reservations, requestData)
            .then(({ data }) => data)
            .catch(handleErrors);
    };

    const createReservationForCompany = (reservation: CompanyReservationFormValues) => {
        const requestData = transformFormValuesToCompanyRequest(reservation);

        return httpClient
            .post<Reservation>(apiEndpoints.reservations, requestData)
            .then(({ data }) => data)
            .catch(handleErrors);
    };

    return { getReservations, createReservationForConsultant, createReservationForCompany };
};
