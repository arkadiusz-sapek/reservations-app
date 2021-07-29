import React from 'react';

import { SlotState, TimeSlot } from '../../reservationsTypings';
import { getTime } from '../../reservationsHelpers';
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
            <time dateTime={timeSlot.startDate}>
                {getTime(timeSlot.startDate)} - {getTime(timeSlot.endDate)}
            </time>
        </S.TimeSlotWrapper>
    );
};

export const TimeSlotCard = React.memo(TimeSlotCardComponent);
