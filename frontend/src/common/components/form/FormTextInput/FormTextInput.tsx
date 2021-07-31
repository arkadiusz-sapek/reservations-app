import React from 'react';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

interface Props extends Omit<ControllerProps, 'render'> {
    label: string;
    required?: boolean;
    type?: 'text' | 'password' | 'number';
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
                <>
                    <span>{props.label}</span>
                    <input
                        disabled={disabled}
                        value={value || ''}
                        onChange={onChange}
                        required={required}
                        type={type}
                        data-testid={`${props.name}Input`}
                        className={className}
                    />
                    <span>{fieldErrors?.message}</span>
                </>
            )}
            {...props}
        />
    );
};
