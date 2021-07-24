import { areIntervalsOverlapping } from 'date-fns';

import { Reservation, SlotState, TimeSlot } from './reservationsTypings';

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
    const timeSlotIsReserved = reservations.find(
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
