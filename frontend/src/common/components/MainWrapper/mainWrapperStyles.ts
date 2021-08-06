import styled from '@emotion/styled';

export const Header = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.big};
`;

export const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: calc(100vh - 10rem);
`;
