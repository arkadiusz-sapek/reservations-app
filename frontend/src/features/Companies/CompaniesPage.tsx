import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';

import { routes } from 'settings/routes';
import { useCompaniesServices } from './companiesServices';
import * as S from './companiesPageStyles';
import { CompanyForm } from './CompanyForm/CompanyForm';
import { Company } from './companiesTypings';

export const CompaniesPage = () => {
    const [companyProfile, setCompanyProfile] = useState<Company>();
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const { getCompanyProfile } = useCompaniesServices();

    useEffect(() => {
        setIsLoading(true);
        getCompanyProfile()
            .then(companyData => {
                // if (companyData) {
                //     setCompanyProfile(companyData);
                //     history.push(routes.reservations);
                // }
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <S.ReservationsPageWrapper>
            <h2>Before you can use the application, you must create a company profile </h2>

            <ClipLoader size={60} color="white" loading={isLoading} />
            <CompanyForm />
        </S.ReservationsPageWrapper>
    );
};
