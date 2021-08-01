import styled from '@emotion/styled';

export const ReservationsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 1rem;
`;

export const ReservationsPageWrapper = styled.main`
    display: flex;
    padding: 0.25rem;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;

    ${({ theme }) => theme.breakpoints.xl} {
        padding: 0.25rem;
    }
`;
