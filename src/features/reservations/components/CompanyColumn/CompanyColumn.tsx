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
        <S.HeaderWrapper>
            <S.CompanyHeader>{company.name}</S.CompanyHeader>
        </S.HeaderWrapper>
        <S.ColumnContentWrapper></S.ColumnContentWrapper>
        <S.TimeSlotsWrapper>
            {Object.entries(company.days).map(([date, timeSlots]) => (
                <S.TimeSlotGroup key={date}>
                    <S.TimeSlotGroupHeader>
                        {format(new Date(date), 'EEEE')} ({format(new Date(date), 'yyyy-MM-dd')})
                    </S.TimeSlotGroupHeader>
                    {timeSlots.map(timeSlot => (
                        <TimeSlotCard key={timeSlot.startDate} timeSlot={timeSlot} />
                    ))}
                </S.TimeSlotGroup>
            ))}
        </S.TimeSlotsWrapper>
    </S.ColumnWrapper>
);
