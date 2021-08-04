export interface Company {
    id: number;
    name: string;
    description: string;
    reservationPeriodStart: string;
    reservationPeriodEnd: string;
    user: string;
}

export type CreateCompanyRequest = Omit<Company, 'id' | 'user'>;
