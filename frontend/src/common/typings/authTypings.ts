export enum UserRole {
    Client = 'CLIENT',
    Consultant = 'CONSULTANT',
}

export interface User {
    id: number;
    email: string;
    role: UserRole;
    company: string;
}
