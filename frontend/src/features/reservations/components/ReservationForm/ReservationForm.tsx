import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Reservation } from 'features/Reservations/reservationsTypings';
import { getRequired } from 'common/helpers/validationHelpers';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { FormRangePicker } from 'common/components/form/FormRangePicker';
import { useReservationServices } from 'features/Reservations/reservationsServices';

const validationSchema = Yup.object().shape({
    name: getRequired('Email'),
    startDate: getRequired('Start'),
    endDate: getRequired('End'),
    companyId: getRequired('Company'),
});

interface Props {
    initialValues?: Reservation;
}

export const ReservationForm = ({ initialValues }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const formControl = useForm<Reservation>({
        resolver: yupResolver(validationSchema),
    });

    const { createReservation } = useReservationServices();

    const onSubmit = (reservationFormValues: Reservation) => {
        setIsLoading(true);

        createReservation(reservationFormValues)
            .then(() => {
                console.log('elo');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <FormProvider {...formControl}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <FormTextInput name="title" label="Title" />
                    <FormRangePicker name="dateRange" />
                </form>
            </FormProvider>
        </>
    );
};
