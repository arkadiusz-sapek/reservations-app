import { SelectsOptions } from 'common/commonTypings';
import { StylesConfig } from 'react-select';

import { fontSize } from 'settings/variables';

const controlBorder = `solid 1px gray`;

export const selectStyles: StylesConfig<SelectsOptions, true> = {
    option: provided => ({
        ...provided,
        color: 'black',
        backgroundColor: 'white',
        padding: '0.55rem 0 0.55rem 2rem',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: 'white',
        },
    }),
    valueContainer: provided => ({
        ...provided,
        color: 'black',
        backgroundColor: `white`,
        borderRadius: '0',
        padding: '0.4rem 0 0.4rem 1rem',
    }),
    indicatorsContainer: provided => ({
        ...provided,
        borderRadius: '0',
        backgroundColor: `white`,
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
        backgroundColor: 'white',
    }),
};
