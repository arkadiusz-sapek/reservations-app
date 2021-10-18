import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_NAME } from '@mobile/settings/variables';

const basePath = 'http://localhost:8080/api';

export const httpClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(
    async config => {
        const url = `${basePath}${config.url}`;

        const authToken = await AsyncStorage.getItem(AUTH_TOKEN_NAME);

        if (authToken) {
            return {
                ...config,
                url,
                headers: { ...config.headers, Authorization: `Bearer ${authToken}` },
            };
        }

        return { ...config, url };
    },
    error => Promise.reject(error),
);
