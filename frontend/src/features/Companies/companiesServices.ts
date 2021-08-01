import { apiEndpoints } from 'settings/api';
import { httpClient } from 'common/services/httpClient';
import { CreateCompanyRequest, Company } from './companiesTypings';

export const useCompaniesServices = () => {
    const getCompanyProfile = (): Promise<Company> =>
        httpClient.get<Company>(apiEndpoints.companies).then(({ data }) => data);

    const createCompanyProfile = (reservation: CreateCompanyRequest): Promise<Company> =>
        httpClient.post<Company>(apiEndpoints.companies, reservation).then(({ data }) => data);

    return { getCompanyProfile, createCompanyProfile };
};
