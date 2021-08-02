export enum UserRole {
    Client = 'CLIENT',
    Consultant = 'CONSULTANT',
}

export interface User {
    id: string;
    email: string;
    role: UserRole;
    company: string;
}
