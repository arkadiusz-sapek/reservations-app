import styled from '@emotion/styled';

export const Header = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.big};
`;

export const Wrapper = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    border-radius: 1rem;
`;
