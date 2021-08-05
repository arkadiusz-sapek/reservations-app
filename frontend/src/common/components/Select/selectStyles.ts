import styled from '@emotion/styled';
import { StylesConfig } from 'react-select';

import { fontSize, palette } from 'settings/variables';
import { SelectOption } from 'common/typings/selectTypings';

export const FormFieldWrapper = styled.div`
    width: 100%;
    margin: 0;
    position: relative;
`;

export const Label = styled.label`
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: ${fontSize.normal};
    color: ${({ theme }) => theme.palette.text.primary};
`;

const controlBorder = `solid 1px black`;

export const selectStyles: StylesConfig<SelectOption, false> = {
    option: provided => ({
        ...provided,
        color: palette.text.primary,
        backgroundColor: palette.background.primary,
        padding: '0.55rem 0 0.55rem 2rem',
        transition: '0.5s',
        zIndex: 100,
        '&:hover': {
            backgroundColor: palette.primary.light,
            color: palette.primary.contrastText,
        },
    }),
    valueContainer: provided => ({
        ...provided,
        padding: '0.4rem 0 0.4rem 1rem',
        color: palette.text.primary,
        backgroundColor: palette.background.primary,
        borderRadius: '0.25rem',
        zIndex: 100,
    }),
    indicatorsContainer: provided => ({
        ...provided,
        borderRadius: '0.25rem',
        backgroundColor: palette.background.primary,
        zIndex: 100,
    }),
    control: provided => ({
        ...provided,
        border: controlBorder,
        fontSize: fontSize.normal,
        boxShadow: 'none',
        borderRadius: '0.25rem',
        zIndex: 100,

        '&:hover': {
            border: controlBorder,
        },
    }),
    container: provided => ({
        ...provided,
        borderRadius: '0.25rem',
        zIndex: 100,
    }),
    indicatorSeparator: provided => ({
        ...provided,
        display: 'none',
    }),
    multiValue: provided => ({
        ...provided,
        zIndex: 100,
    }),
    noOptionsMessage: provided => ({
        ...provided,
        backgroundColor: palette.background.primary,
    }),
};
