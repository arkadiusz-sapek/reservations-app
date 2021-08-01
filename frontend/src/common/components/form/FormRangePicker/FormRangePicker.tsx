import { FormFieldWrapper, Input } from 'common/styled';
import { getFullDate } from 'features/Reservations/reservationsHelpers';
import React, { useState } from 'react';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';
import DateRangePicker from 'react-range-picker';

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
        <FormFieldWrapper>
            <Controller
                control={control}
                rules={{ required }}
                render={({ field: { onChange, value } }) => (
                    <div className="relative">
                        <RangePicker
                            onChange={onChange}
                            value={value}
                            selectTime
                            rangeTillEndOfDay
                            placeholder={({
                                startDate,
                                endDate,
                            }: {
                                startDate: string;
                                endDate: string;
                            }) => (
                                <div className="flex">
                                    <div className="mr-4">
                                        <span>Start</span>
                                        <Input
                                            disabled
                                            value={(startDate && getFullDate(startDate)) || ''}
                                            onChange={onChange}
                                            required={required}
                                            data-testid={`${props.name}Input`}
                                            className={className}
                                        />
                                    </div>
                                    <div>
                                        <span>End</span>
                                        <Input
                                            disabled
                                            value={(endDate && getFullDate(endDate)) || ''}
                                            onChange={onChange}
                                            required={required}
                                            data-testid={`${props.name}Input`}
                                            className={className}
                                        />
                                    </div>
                                </div>
                            )}
                        />
                        <span>{fieldErrors?.message}</span>
                    </div>
                )}
                {...props}
            />
        </FormFieldWrapper>
    );
};
