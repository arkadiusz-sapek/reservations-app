/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpClient } from 'common/services/httpClient';

export const mockApi = (): void => {
    httpClient.get = jest.fn((): Promise<any> => Promise.resolve({}));
    httpClient.options = jest.fn((): Promise<any> => Promise.resolve({}));
    httpClient.post = jest.fn((): Promise<any> => Promise.resolve({}));
    httpClient.patch = jest.fn((): Promise<any> => Promise.resolve({}));
    httpClient.put = jest.fn((): Promise<any> => Promise.resolve({}));
    httpClient.delete = jest.fn((): Promise<any> => Promise.resolve({}));
};

export const mockedApiClient: any = httpClient;
