export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    email: string;
    password: string;
    passwordRepetition: string;
}

export interface RegisterResponse {
    token: string;
}
