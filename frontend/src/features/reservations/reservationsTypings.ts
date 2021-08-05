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

export interface ReservationDateInitialValues {
    date: string;
    endTime: string;
    startTime: string;
}

export interface CompanyReservationFormValues extends ReservationDateInitialValues {
    title: string;
    description: string;
    consultant: SelectOption;
}

export interface ConsultantReservationFormValues extends ReservationDateInitialValues {
    title: string;
    description: string;
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
