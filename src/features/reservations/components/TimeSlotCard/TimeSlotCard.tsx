import React from 'react';
import { format } from 'date-fns';

import { SlotState, TimeSlot } from '../../reservationsTypings';
import * as S from './timeSlotsStyles';
import { getColors } from './timeSlotsStyles';

interface Props {
    timeSlot: TimeSlot;
    slotState: SlotState;
}

const TimeSlotCardComponent = ({ timeSlot, slotState }: Props) => {
    const slotColors = getColors(slotState);
    return (
        <S.TimeSlotWrapper
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

export const TimeSlotCard = React.memo(TimeSlotCardComponent);
