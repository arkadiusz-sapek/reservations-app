import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Button = styled.button`
    border: none;
    background: transparent;
    font-size: ${({ theme }) => theme.fontSize.normal};
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 0.25rem;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.primary.main};
`;

const commonStyles = css`
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    padding: 0.75rem 1rem;
    border: 1px solid black;
    border-radius: 0.25rem;
`;

export const Input = styled.input`
    ${commonStyles}
`;

export const Textarea = styled.textarea`
    ${commonStyles}
    height: 9rem;
    resize: none;
    font-size: ${({ theme }) => theme.fontFamily.primary};
`;

export const FormFieldWrapper = styled.div`
    width: 100%;
    margin: 0.5rem 0;
    position: relative;
`;
