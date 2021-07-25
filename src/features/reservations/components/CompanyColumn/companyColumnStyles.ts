import styled from '@emotion/styled';

export const CompanyHeader = styled.h1`
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.big};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    text-align: center;
`;

export const HeaderWrapper = styled.div`
    background-color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 1rem;
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 0.25rem;
    box-shadow: ${({ theme }) => theme.palette.boxShadows.card};

    ${({ theme }) => theme.breakpoints.xl} {
        max-height: calc(100vh - 10rem);
    }
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

    // These styles should replace the scroll on all systems with one from ios devices and be always visible
    ::-webkit-scrollbar {
        width: 7px;
        -webkit-appearance: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
`;

export const TimeSlotGroupWrapper = styled.div`
    padding: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
`;

export const ReservationTimeWrapper = styled.time`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TimeSlotsWrapper = styled.div`
    padding: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
    max-width: 23rem;
`;

export const TimeSlotGroupHeader = styled.h2`
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-weight: ${({ theme }) => theme.fontWeight.demiBold};
    color: ${({ theme }) => theme.palette.primary.dark};
    margin: 0;
`;

export const TimeSlotButton = styled.button`
    padding: 0;
    background: transparent;
    margin: 0;
    border: 0;
    font-family: ${({ theme }) => theme.fontFamily.primary};
`;
