import { SelectOption, SelectValues } from 'common/typings/selectTypings';
import React from 'react';
import ReactSelect from 'react-select';

import { selectStyles } from './selectStyles';

interface Props {
    label: string;
    options: SelectOption[];
    value: SelectValues | null;
    handleOptionsSelect: (selectedOptions: SelectValues) => void;
    isMulti?: boolean;
    noOptionMessage?: () => string;
    defaultValue?: SelectValues;
}

export const Select = ({
    value,
    handleOptionsSelect,
    noOptionMessage,
    isMulti = false,
    defaultValue,
    ...props
}: Props) => (
    <ReactSelect
        isMulti={false}
        value={value}
        onChange={handleOptionsSelect}
        closeMenuOnSelect={!isMulti}
        styles={selectStyles}
        options={props.options}
        noOptionsMessage={noOptionMessage}
    />
);
