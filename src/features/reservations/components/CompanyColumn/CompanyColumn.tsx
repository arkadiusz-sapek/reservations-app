import React from 'react';
import { format } from 'date-fns';

import { Company } from '../../reservationsTypings';
import { TimeSlotCard } from '../TimeSlotCard';

import * as S from './companyColumnStyles';

interface Props {
    company: Company;
}

export const CompanyColumn = ({ company }: Props) => (
    <S.ColumnWrapper>
        <S.CompanyHeader>{company.name}</S.CompanyHeader>
        <S.TimeSlotsWrapper>
            {Object.entries(company.days).map(([date, timeSlots]) => (
                <>
                    {format(new Date(date), 'EEEE')}
                    {timeSlots.map(timeSlot => (
                        <TimeSlotCard key={timeSlot.startDate} timeSlot={timeSlot} />
                    ))}
                </>
            ))}
        </S.TimeSlotsWrapper>
    </S.ColumnWrapper>
);
