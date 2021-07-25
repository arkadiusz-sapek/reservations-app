import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { palette } from 'settings/variables';
import { CompanyColumn } from './components/CompanyColumn';
import { useReservationServices } from './reservationsServices';
import { Company } from './reservationsTypings';
import { CompaniesSelect } from './components/CompaniesSelect';
import { ReservationsContext, setSelectedCompanies } from './reservationsContext';
import { transformCompanyToOption } from './reservationsHelpers';
import * as S from './reservationsPageStyles';

export const ReservationsPage = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { getReservationsRequest } = useReservationServices();

    const {
        dispatch,
        state: { selectedCompanies },
    } = useContext(ReservationsContext);

    useEffect(() => {
        setIsLoading(true);
        getReservationsRequest()
            .then(reservationsData => {
                setCompanies(reservationsData);
                dispatch(
                    setSelectedCompanies(
                        reservationsData.slice(0, 3).map(transformCompanyToOption),
                    ),
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const companiesToShow = companies.filter(company =>
        selectedCompanies?.some(({ value }) => value === company.id),
    );

    return (
        <S.ReservationsPageWrapper>
            <CompaniesSelect companies={companies} />
            <S.LoaderWrapper>
                <ClipLoader size={60} color={palette.primary.main} loading={isLoading} />
            </S.LoaderWrapper>
            {isLoading || (
                <S.ReservationsWrapper>
                    {companiesToShow.map(company => (
                        <CompanyColumn key={company.id} company={company} />
                    ))}

                    {companiesToShow.length === 0 && (
                        <h2>No companies to show. Please choose some company using select above</h2>
                    )}
                </S.ReservationsWrapper>
            )}
        </S.ReservationsPageWrapper>
    );
};
