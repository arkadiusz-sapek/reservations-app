import styled from '@emotion/styled';

export const CompanyHeader = styled.h1`
    border-bottom: 1px solid black;
    padding-bottom: 1rem;
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
        0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const TimeSlotsWrapper = styled.div`
    max-height: 30rem;
    overflow: scroll;
`;
