import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

import { FormFieldWrapper, Input, Textarea } from 'common/styled';
import React from 'react';

interface Props extends Omit<ControllerProps, 'render'> {
    label: string;
    required?: boolean;
    type?: 'text' | 'password' | 'number' | 'time';
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
                        />
                    ) : (
                        <Textarea
                            value={value || ''}
                            onChange={onChange}
                            disabled={disabled}
                            required={required}
                            rows={rows}
                            data-testid={`${props.name}Textarea`}
                        />
                    )}

                    <span>{fieldErrors?.message}</span>
                </FormFieldWrapper>
            )}
            {...props}
        />
    );
};
