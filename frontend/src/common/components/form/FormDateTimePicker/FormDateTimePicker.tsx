import { FormFieldWrapper, Input } from 'common/styled';
import { getFullDate } from 'features/Reservations/reservationsHelpers';
import React, { useState } from 'react';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';
import DateRangePicker from 'react-range-picker';
import { FormTextInput } from '../FormTextInput';

interface Props extends Omit<ControllerProps, 'render' | 'name'> {
    name: string;
    required?: boolean;
    className?: string;
    multiline?: boolean;
    rows?: number;
    children?: React.ReactNode;
}
// TODO- replace picker or add types
const RangePicker = DateRangePicker as any;

export const FormRangePicker = ({
    required,
    className,
    multiline,
    rows,
    ...props
}: Props): JSX.Element => {
    const [myvalue, onDateChange] = useState([new Date(), new Date()]);

    const { control, formState } = useFormContext();

    const fieldErrors = formState.errors?.[props.name];

    return (
        <div className="flex">
            <FormTextInput name="start" label="Start" type="date" />
            <FormTextInput name="start" label="End" type="time" />
        </div>
    );
};
