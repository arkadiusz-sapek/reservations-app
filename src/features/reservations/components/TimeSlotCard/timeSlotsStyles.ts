import styled from '@emotion/styled';

import { SlotState } from 'features/reservations/reservationsTypings';
import { palette } from 'settings/variables';

export const getColors = (slotState: SlotState) => {
    switch (slotState) {
        case SlotState.Reserved:
            return { background: palette.primary.main, text: palette.primary.contrastText };
        case SlotState.Disabled:
            return { background: palette.disabled.main };
        default:
            return {};
    }
};

interface TimeSlotWrapperProps {
    backgroundColor?: string;
    textColor?: string;
    cursor?: string;
}

export const TimeSlotWrapper = styled.div<TimeSlotWrapperProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    margin: 0.1rem;
    width: 6rem;
    height: 1.5rem;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
        0px 1px 3px 0px rgb(0 0 0 / 12%);
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    cursor: ${({ cursor }) => cursor};

    ${({ theme }) => theme.breakpoints.xl} {
        padding: 0.5rem;
        margin: 0.25rem;
        width: 6.5rem;
        height: 2rem;
    }
`;

export const TimeDesignation = styled.span`
    display: inline-block;
    width: 3rem;
`;
