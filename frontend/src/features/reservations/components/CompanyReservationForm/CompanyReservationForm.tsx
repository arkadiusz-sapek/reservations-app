import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Reservation, ReservationFormValues } from 'features/Reservations/reservationsTypings';
import { getRequired } from 'common/helpers/validationHelpers';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { FormRangePicker } from 'common/components/form/FormDateTimePicker';
import { useReservationServices } from 'features/Reservations/reservationsServices';
import { UserRole } from 'common/typings/authTypings';

import { useUserServices } from 'core/services/userServices';
import { FormSelect } from 'common/components/form/FormSelect';
import { SelectOption } from 'common/typings/selectTypings';
import { Button } from 'common/styled';
import ClipLoader from 'react-spinners/ClipLoader';

const validationSchema = Yup.object().shape({
    name: getRequired('Email'),
    startDate: getRequired('Start'),
    endDate: getRequired('End'),
    consultant: getRequired('Consultant'),
});

interface Props {
    initialValues?: Reservation;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompanyReservationForm = ({ initialValues }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [consultantOptions, setConsultantsOptions] = useState<SelectOption[]>([]);

    const formControl = useForm<ReservationFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { createReservationForConsultant } = useReservationServices();
    const { getAllUsers } = useUserServices();

    const getConsultants = () => {
        getAllUsers(UserRole.Consultant).then(consultantsData => {
            const options = consultantsData.map(consultant => ({
                label: consultant.email,
                value: consultant.id,
            }));
            setConsultantsOptions(options);
        });
    };

    useEffect(() => {
        getConsultants();
    }, []);

    const onSubmit = (reservationFormValues: ReservationFormValues) => {
        setIsLoading(true);

        createReservationForConsultant(reservationFormValues)
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
                    <FormSelect name="consultant" label="Consultant" options={consultantOptions} />
                    <div className="flex justify-end mt-8 ">
                        <Button color="primary" type="submit" data-testid="submitButton">
                            Log in
                            <div className="inline-block ml-2 w-1">
                                <ClipLoader size={15} color="white" loading={isLoading} />
                            </div>
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};
