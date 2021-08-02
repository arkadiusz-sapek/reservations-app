import { SelectOption } from 'common/typings/selectTypings';

export interface Reservation {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    user: string;
    company: string;
}

export type CreateReservationRequest = Omit<Reservation, 'id'>;

export interface ReservationFormValues {
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    company: SelectOption;
}

export interface ReservationResponse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    user: string;
    company: string;
}

export interface CalendarItem {
    id: string;
    title: string;
    start: Date;
    end: Date;
}
