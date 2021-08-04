import { apiEndpoints } from 'settings/api';
import { httpClient } from 'common/services/httpClient';
import { CreateCompanyRequest, Company } from './companiesTypings';

export const useCompaniesServices = () => {
    const getAllCompanies = (): Promise<Company[]> =>
        httpClient.get<Company[]>(apiEndpoints.companies).then(({ data }) => data);

    const getClientCompany = (): Promise<Company> =>
        httpClient.get<Company>(apiEndpoints.clientCompany).then(({ data }) => data);

    const getCompanyProfile = (): Promise<Company> =>
        httpClient.get<Company>(apiEndpoints.clientCompany).then(({ data }) => data);

    const createCompanyProfile = (company: CreateCompanyRequest): Promise<Company> =>
        httpClient.post<Company>(apiEndpoints.companies, company).then(({ data }) => data);

    return { getAllCompanies, getCompanyProfile, createCompanyProfile, getClientCompany };
};
