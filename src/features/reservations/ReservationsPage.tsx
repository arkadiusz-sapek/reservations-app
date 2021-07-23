import React from 'react';

import { CompanyColumn } from './components/CompanyColumn';
import * as S from './reservationsPageStyles';

export const ReservationsPage = () => (
    <S.ReservationsWrapper>
        <CompanyColumn />
    </S.ReservationsWrapper>
);
