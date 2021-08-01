export interface Company {
    id: string;
    description: string;
    reservationPeriodStart: string;
    reservationPeriodEnd: string;
    user: string;
}

export type CreateCompanyRequest = Omit<Company, 'id' | 'user'>;
