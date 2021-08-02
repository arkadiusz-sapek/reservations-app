export const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

export const apiEndpoints = {
    login: '/log-in',
    register: '/sign-in',
    me: '/users/me',
    users: '/users',
    reservations: '/reservations',
    companies: '/companies',
    clientCompany: '/companies/client',
};
