import React from 'react';
import ReactSelect from 'react-select';

import { SelectOption, SelectValues } from 'common/commonTypings';
import * as S from './selectStyles';
import { selectStyles } from './selectStyles';

interface Props {
    label: string;
    options: SelectOption[];
    value: SelectValues | null;
    handleOptionsSelect: (selectedOptions: SelectValues) => void;
    isMulti?: boolean;
    noOptionMessage?: () => string;
}

export const Select = ({
    value,
    handleOptionsSelect,
    noOptionMessage,
    isMulti = false,
    ...props
}: Props) => (
    <S.FormFieldWrapper>
        <div>
            <S.Label>{props.label}</S.Label>
        </div>
        <ReactSelect
            isMulti={isMulti}
            value={value}
            onChange={handleOptionsSelect}
            closeMenuOnSelect={!isMulti}
            styles={selectStyles}
            options={props.options}
            noOptionsMessage={noOptionMessage}
        />
    </S.FormFieldWrapper>
);
