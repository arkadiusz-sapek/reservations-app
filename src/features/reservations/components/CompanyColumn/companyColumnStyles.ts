import styled from '@emotion/styled';
import { fontSize, fontWeight, palette } from 'settings/variables';

export const CompanyHeader = styled.h1`
    font-weight: ${fontWeight.regular};
    font-size: ${fontSize.big};
    color: ${palette.primary.contrastText};
    text-align: center;
`;

export const HeaderWrapper = styled.div`
    background-color: ${palette.primary.main};
    margin-bottom: 1rem;
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
        0px 1px 3px 0px rgb(0 0 0 / 12%);
    min-width: 20rem;
`;

export const ColumnContentWrapper = styled.div`
    padding: 0 1rem;
`;

export const TimeSlotsWrapper = styled.div`
    padding: 0 1rem;
    overflow: scroll;
`;

export const TimeSlotGroup = styled.div`
    padding: 0.5rem 0;
`;

export const TimeSlotGroupHeader = styled.h2`
    font-size: ${fontSize.medium};
    font-weight: ${fontWeight.demiBold};
    color: ${palette.primary.dark};
    margin: 0;
`;
