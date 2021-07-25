import React, { useContext, useEffect, useState } from 'react';

import { CompanyColumn } from './components/CompanyColumn';
import { useReservationServices } from './reservationsServices';
import { Company } from './reservationsTypings';
import { CompaniesSelect } from './components/CompaniesSelect';
import { ReservationsContext, setSelectedCompanies } from './reservationsContext';
import { transformCompanyToOption } from './reservationsHelpers';
import * as S from './reservationsPageStyles';

export const ReservationsPage = () => {
    const [companies, setCompanies] = useState<Company[]>([]);

    const { getReservationsRequest } = useReservationServices();

    const {
        dispatch,
        state: { selectedCompanies },
    } = useContext(ReservationsContext);

    useEffect(() => {
        getReservationsRequest().then(reservationsData => {
            setCompanies(reservationsData);
            dispatch(
                setSelectedCompanies(reservationsData.slice(0, 3).map(transformCompanyToOption)),
            );
        });
    }, []);

    const companiesToShow = companies.filter(company =>
        selectedCompanies?.some(({ value }) => value === company.id),
    );

    return (
        <S.ReservationsPageWrapper>
            <CompaniesSelect companies={companies} />
            <S.ReservationsWrapper>
                {companiesToShow.map(company => (
                    <CompanyColumn key={company.id} company={company} />
                ))}

                {companiesToShow.length === 0 && (
                    <h2>No companies to show. Please choose some company using select above</h2>
                )}
            </S.ReservationsWrapper>
        </S.ReservationsPageWrapper>
    );
};
