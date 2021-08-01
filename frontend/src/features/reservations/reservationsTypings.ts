export interface Reservation {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    userId: string;
    companyId: string;
}

export type CreateReservationRequest = Omit<Reservation, 'id'>;

export interface ReservationResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    user: string;
    company: string;
}

export interface CalendarItem {
    title: string;
    start: Date;
    end: Date;
}
