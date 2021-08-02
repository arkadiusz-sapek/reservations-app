import { SelectOption } from 'common/typings/selectTypings';

export interface RegisterRequest {
    email: string;
    role: string;
    password: string;
}

export interface RegisterFormValues {
    email: string;
    role: SelectOption;
    password: string;
    passwordRepetition: string;
}

export interface RegisterResponse {
    token: string;
}
