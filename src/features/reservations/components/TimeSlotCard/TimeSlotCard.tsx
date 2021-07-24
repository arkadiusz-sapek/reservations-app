import React from 'react';
import { format } from 'date-fns';

import { SlotState, TimeSlot } from '../../reservationsTypings';
import * as S from './dateSlotsStyles';
import { getColors } from './dateSlotsStyles';

interface Props {
    timeSlot: TimeSlot;
    handleClick: () => void;
    slotState: SlotState;
}

export const TimeSlotCard = ({ timeSlot, handleClick, slotState }: Props) => {
    const slotColors = getColors(slotState);
    return (
        <S.TimeSlotWrapper
            onClick={handleClick}
            backgroundColor={slotColors.background}
            textColor={slotColors.text}
            cursor={slotState === SlotState.Free ? 'pointer' : 'default'}
        >
            <div>
                <S.TimeDesignation>From:</S.TimeDesignation>
                {format(new Date(timeSlot.startDate), 'hh:mm')}
            </div>
            <div>
                <S.TimeDesignation>To:</S.TimeDesignation>
                {format(new Date(timeSlot.endDate), 'hh:mm')}
            </div>
        </S.TimeSlotWrapper>
    );
};
