import { SelectOption } from 'common/typings/selectTypings';

export interface Reservation {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    user: number;
    company: number;
}

export type CreateReservationRequest = Omit<Reservation, 'id'>;

export interface ReservationFormValues {
    title: string;
    description: string;
    date: string;
    endTime: string;
    startTime: string;
    company: SelectOption;
}

export interface ConsultantReservationFormValues {
    title: string;
    description: string;
    date: string;
    endTime: string;
    startTime: string;
    company: SelectOption;
}

export interface ReservationResponse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    user: number;
    company: number;
}

export interface CalendarItem {
    id: number;
    title: string;
    start: Date;
    end: Date;
}
