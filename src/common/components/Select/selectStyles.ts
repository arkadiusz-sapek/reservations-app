import styled from '@emotion/styled';
import { StylesConfig } from 'react-select';

import { fontSize, palette } from 'settings/variables';
import { SelectOption } from 'common/commonTypings';

export const FormFieldWrapper = styled.div`
    width: 100%;
    margin: 0;
    position: relative;
`;

export const Label = styled.label`
    font-size: ${fontSize.normal};
    display: inline-block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.palette.text.primary};
`;

const controlBorder = `solid 1px gray`;

export const selectStyles: StylesConfig<SelectOption, false> = {
    option: provided => ({
        ...provided,
        color: palette.text.primary,
        backgroundColor: palette.background.primary,
        padding: '0.55rem 0 0.55rem 2rem',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: palette.background.primary,
        },
    }),
    valueContainer: provided => ({
        ...provided,
        color: palette.text.primary,
        backgroundColor: palette.background.primary,
        borderRadius: '0',
        padding: '0.4rem 0 0.4rem 1rem',
    }),
    indicatorsContainer: provided => ({
        ...provided,
        borderRadius: '0',
        backgroundColor: palette.background.primary,
    }),
    control: provided => ({
        ...provided,
        border: controlBorder,
        borderRadius: '0',
        fontSize: fontSize.normal,
        boxShadow: 'none',
        '&:hover': {
            border: controlBorder,
        },
    }),
    container: provided => ({
        ...provided,
    }),
    indicatorSeparator: provided => ({
        ...provided,
        display: 'none',
    }),
    multiValue: provided => ({
        ...provided,
    }),
    noOptionsMessage: provided => ({
        ...provided,
        backgroundColor: palette.background.primary,
    }),
};
