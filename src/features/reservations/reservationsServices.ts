import { compareAsc } from 'date-fns';
import { groupBy } from 'ramda';
import { apiEndpoints } from 'settings/api';

import { httpClient } from 'common/services/httpClient';
import { TimeSlot, TimeSlotResponse, Company, CompanyResponse } from './reservationsTypings';

export const useReservationServices = () => {
    const transformResponseToDateSlot = ({ start_time, end_time }: TimeSlotResponse): TimeSlot => ({
        startDate: start_time,
        endDate: end_time,
    });

    const slotsSorter = (firstSlot: TimeSlot, secondSort: TimeSlot) =>
        compareAsc(new Date(firstSlot.startDate), new Date(secondSort.startDate));

    const groupByDay = groupBy((timeslot: TimeSlot) => {
        const date = new Date(timeslot.startDate);

        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();
    });

    const transformResponseToCompany = ({ time_slots, ...company }: CompanyResponse): Company => ({
        ...company,
        days: groupByDay(time_slots.map(transformResponseToDateSlot).sort(slotsSorter)),
    });

    const getReservationsRequest = (): Promise<Company[]> =>
        httpClient
            .get<CompanyResponse[]>(apiEndpoints.reservations)
            .then(({ data }) => data.map(transformResponseToCompany));

    return { getReservationsRequest };
};
