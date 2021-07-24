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
    width: 100%;
    max-height: 50rem;
    margin: 0 0.25rem;
`;

export const ColumnContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 8rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
`;

export const TimeSlotGroupsWrapper = styled.div`
    padding: 0 1rem;
    overflow: scroll;
`;

export const TimeSlotGroupWrapper = styled.div`
    padding: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
`;

export const TimeSlotsWrapper = styled.div`
    padding: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
    max-width: 23rem;
`;

export const TimeSlotGroupHeader = styled.h2`
    width: 100%;
    font-size: ${fontSize.medium};
    font-weight: ${fontWeight.demiBold};
    color: ${palette.primary.dark};
    margin: 0;
`;
