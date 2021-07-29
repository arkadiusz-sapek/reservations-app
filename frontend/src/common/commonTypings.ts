import { ValueType } from 'react-select';

export interface SelectOption {
    label: string;
    value: string | number;
}

export type SelectValues = ValueType<SelectOption, boolean>;
