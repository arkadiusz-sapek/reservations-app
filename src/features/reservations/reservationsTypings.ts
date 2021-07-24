export interface TimeSlotResponse {
    start_time: string;
    end_time: string;
}

export interface CompanyResponse {
    id: number;
    name: string;
    type: string;
    time_slots: TimeSlotResponse[];
}

export interface TimeSlot {
    startDate: string;
    endDate: string;
}

export interface Company {
    id: number;
    name: string;
    type: string;
    days: TimeSlotsGroups;
}

export interface TimeSlotsGroups {
    [key: string]: TimeSlot[];
}

export interface Reservation {
    companyId: number;
    timeSlot: TimeSlot;
}

export enum SlotState {
    Free = 'FREE',
    Disabled = 'DISABLED',
    Reserved = 'RESERVED',
}
