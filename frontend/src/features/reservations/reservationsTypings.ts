export interface Reservation {
    title: string;
    start: Date;
    end: Date;
}

export interface ReservationResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}
