import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

import { FormError, FormFieldWrapper, Input, Textarea } from 'common/styled';
import React from 'react';

interface Props extends Omit<ControllerProps, 'render'> {
    label: string;
    required?: boolean;
    type?: 'text' | 'password' | 'number' | 'time' | 'date';
    autoComplete?: string;
    className?: string;
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const FormTextInput = ({
    type = 'text',
    required,
    className,
    multiline,
    rows,
    autoComplete,
    disabled = false,
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
                    <span>{props.label}</span>

                    {!multiline ? (
                        <Input
                            disabled={disabled}
                            value={value || ''}
                            onChange={onChange}
                            required={required}
                            type={type}
                            data-testid={`${props.name}Input`}
                            className={className}
                            autoComplete={autoComplete}
                        />
                    ) : (
                        <Textarea
                            value={value || ''}
                            onChange={onChange}
                            disabled={disabled}
                            required={required}
                            rows={rows}
                            data-testid={`${props.name}Textarea`}
                            className={className}
                        />
                    )}

                    <FormError>{fieldErrors?.message}</FormError>
                </FormFieldWrapper>
            )}
            {...props}
        />
    );
};
