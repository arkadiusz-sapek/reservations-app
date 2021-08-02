import styled from '@emotion/styled';

export const Header = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.big};
`;

export const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5rem;
    padding: 1rem;
`;
