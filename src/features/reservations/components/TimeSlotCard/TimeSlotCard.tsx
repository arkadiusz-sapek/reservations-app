import { format } from 'date-fns';
import React from 'react';
import { TimeSlot } from '../../reservationsTypings';
import * as S from './dateSlotsStyles';

interface Props {
    timeSlot: TimeSlot;
}

export const TimeSlotCard = ({ timeSlot }: Props) => (
    <S.TimeSlotWrapper>
        <div>{format(new Date(timeSlot.startDate), 'hh:mm')}</div>
        <div>{format(new Date(timeSlot.endDate), 'hh:mm')}</div>
    </S.TimeSlotWrapper>
);
