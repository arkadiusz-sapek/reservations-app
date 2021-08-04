import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ButtonProps {
    backgroundColor?: string;
}

export const Button = styled.button<ButtonProps>`
    border: none;
    background: transparent;
    font-size: ${({ theme }) => theme.fontSize.normal};
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 0.25rem;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme, backgroundColor }) =>
        backgroundColor || theme.palette.primary.main};
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
    margin: 1rem 0;
    position: relative;
`;

export const FormError = styled.p`
    width: 100%;
    position: absolute;
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.palette.error.main};
`;
