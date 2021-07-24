import React, { FC } from 'react';
import styled from '@emotion/styled';
import ReactSelect from 'react-select';

import { fontSize } from 'settings/variables';
import { SelectsOptions, SelectsValues } from 'common/commonTypings';
import { selectStyles } from './selectStyles';

const FormFieldWrapper = styled.div`
    width: 100%;
    margin: 0;
    position: relative;
`;

export const Label = styled.label`
    font-size: ${fontSize.normal};
    color: black;
    display: inline-block;
    margin-bottom: 0.5rem;

    color: ${({ color }) => color};
`;

interface Props {
    label: string;
    tags: SelectsOptions;
    value: SelectsValues | null;
    handleTagSelect: (selectedOptions: SelectsValues) => void;
    isMulti?: boolean;
    noOptionMessage?: () => string;
}

export const Select: FC<Props> = ({
    value,
    handleTagSelect,
    noOptionMessage,
    isMulti = false,
    ...props
}) => (
    <FormFieldWrapper>
        <div>
            <Label>{props.label}</Label>
        </div>
        <ReactSelect
            isMulti={isMulti}
            placeholder="" // Without defined placeholder it will set "Search" on remove all
            value={value}
            onChange={handleTagSelect}
            closeMenuOnSelect={!isMulti}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            styles={selectStyles as any}
            options={props.tags}
            noOptionsMessage={noOptionMessage}
        />
    </FormFieldWrapper>
);
