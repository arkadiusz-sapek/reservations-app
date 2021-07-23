import axios from 'axios';
import { toast } from 'react-toastify';

const basePath = process.env.REACT_APP_API_URL;

export const httpClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(
    config => ({ ...config, url: `${basePath}${config.url}` }),
    error => Promise.reject(error),
);

httpClient.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            toast('Network error.');
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
