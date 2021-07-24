import { format } from 'date-fns';
import React from 'react';
import { TimeSlot } from '../../reservationsTypings';
import * as S from './dateSlotsStyles';

interface Props {
    timeSlot: TimeSlot;
    handleClick: () => void;
}

export const TimeSlotCard = ({ timeSlot, handleClick }: Props) => (
    <S.TimeSlotWrapper onClick={handleClick}>
        <div>
            <S.TimeDesignationLabel>From:</S.TimeDesignationLabel>
            {format(new Date(timeSlot.startDate), 'hh:mm')}
        </div>
        <div>
            <S.TimeDesignationLabel>To:</S.TimeDesignationLabel>
            {format(new Date(timeSlot.endDate), 'hh:mm')}
        </div>
    </S.TimeSlotWrapper>
);
