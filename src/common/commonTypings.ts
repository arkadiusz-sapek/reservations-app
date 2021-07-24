import { OptionTypeBase, OptionsType, ValueType } from 'react-select';

export interface MultiSelectOptionType extends OptionTypeBase {
    label: string;
    value: string | number;
}

export type SelectsOptions = OptionsType<MultiSelectOptionType>;
export type SelectsValues = ValueType<MultiSelectOptionType, boolean>;
