import React from 'react';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

import { Select } from 'common/components/Select';
import { FormError, FormFieldWrapper } from 'common/styled';
import { SelectOption } from 'common/typings/selectTypings';

interface Props extends Omit<ControllerProps, 'render'> {
    label: string;
    options: SelectOption[];
    disabled?: boolean;
    required?: boolean;
}

export const FormSelect = ({
    label,
    disabled,
    required,
    options,
    ...props
}: Props): JSX.Element => {
    const { control, formState } = useFormContext();

    const fieldErrors = formState.errors?.[props.name];

    return (
        <Controller
            control={control}
            rules={{ required }}
            render={({ field: { onChange, value } }) => (
                <FormFieldWrapper>
                    <span>{label}</span>

                    <Select
                        label={label}
                        handleOptionsSelect={onChange}
                        value={value}
                        options={options}
                    />
                    <FormError>{fieldErrors?.message}</FormError>
                </FormFieldWrapper>
            )}
            {...props}
        />
    );
};
