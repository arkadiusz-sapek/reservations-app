import React from 'react';
import { format } from 'date-fns';

import { SlotState, TimeSlot } from '../../reservationsTypings';
import * as S from './timeSlotsStyles';
import { getColors } from './timeSlotsStyles';

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
            data-testid={`timeSlotCard-${timeSlot.startDate}`}
        >
            {format(new Date(timeSlot.startDate), 'hh:mm')} -{' '}
            {format(new Date(timeSlot.endDate), 'hh:mm')}
        </S.TimeSlotWrapper>
    );
};
