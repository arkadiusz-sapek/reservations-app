import React from 'react';
import ReactSelect from 'react-select';

import { SelectOption, SelectValues } from 'common/commonTypings';
import * as S from './selectStyles';
import { selectStyles } from './selectStyles';

interface Props {
    label: string;
    tags: SelectOption[];
    value: SelectValues | null;
    handleTagSelect: (selectedOptions: SelectValues) => void;
    isMulti?: boolean;
    noOptionMessage?: () => string;
}

export const Select = ({
    value,
    handleTagSelect,
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
            onChange={handleTagSelect}
            closeMenuOnSelect={!isMulti}
            styles={selectStyles}
            options={props.tags}
            noOptionsMessage={noOptionMessage}
        />
    </S.FormFieldWrapper>
);
