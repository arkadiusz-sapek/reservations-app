import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { TOKEN_COOKIE_NAME } from 'settings/variables';

const basePath = process.env.REACT_APP_API_URL;

export const httpClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(
    config => {
        const url = `${basePath}${config.url}`;
        const token = Cookies.get(TOKEN_COOKIE_NAME);

        if (token) {
            return {
                ...config,
                url,
                headers: { ...config.headers, Authorization: `Bearer ${token}` },
            };
        }

        return { ...config, url };
    },
    error => Promise.reject(error),
);

httpClient.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            toast.error('Network error.');
        } else {
            const {
                response: { status, data },
                config,
            } = error;

            if (status === 400) {
                toast.warning(JSON.stringify(data));
            } else if (status === 401 && config.retry) {
                toast.error('Unauthorized');
            } else if (status === 403) {
                toast.error('You don’t have an access to the resource.');
            } else if (status === 404) {
                toast.warning('Requested resource is not available.');
            } else if (status === 500) {
                toast.error('Unexpected error occurred.');
            }
        }
        return Promise.reject(error);
    },
);
