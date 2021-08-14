import { areIntervalsOverlapping, format } from 'date-fns';
import { DATE_FORMAT, DAY_OF_WEEK_FORMAT, TIME_FORMAT } from 'settings/variables';

import { Company, Reservation, SlotState, TimeSlot } from './reservationsTypings';

export const checkIfDatesAreOverlapping = (firstTimeSlot: TimeSlot, secondTimeSlot: TimeSlot) =>
    areIntervalsOverlapping(
        { start: new Date(firstTimeSlot.startDate), end: new Date(firstTimeSlot.endDate) },
        { start: new Date(secondTimeSlot.startDate), end: new Date(secondTimeSlot.endDate) },
    );

export const getSlotState = (
    cardTimeSlot: TimeSlot,
    reservations: Reservation[],
    companyId: number,
) => {
    const timeSlotIsReserved = reservations.some(
        reservation =>
            reservation.companyId === companyId &&
            reservation.timeSlot.startDate === cardTimeSlot.startDate,
    );

    if (timeSlotIsReserved) {
        return SlotState.Reserved;
    }

    const otherReservations = reservations.filter(
        reservation => companyId !== reservation.companyId,
    );

    const areDatesOverlapping = otherReservations.some(({ timeSlot }) =>
        checkIfDatesAreOverlapping(timeSlot, cardTimeSlot),
    );

    if (areDatesOverlapping) {
        return SlotState.Disabled;
    }

    return SlotState.Free;
};

export const transformCompanyToOption = (company: Company) => ({
    value: company.id,
    label: company.name,
});

export const formatDate = (formatToUse: string) => (date: string) =>
    format(new Date(date), formatToUse);

export const getTime = formatDate(TIME_FORMAT);
export const getDate = formatDate(DATE_FORMAT);
export const getDayOfWeek = formatDate(DAY_OF_WEEK_FORMAT);
