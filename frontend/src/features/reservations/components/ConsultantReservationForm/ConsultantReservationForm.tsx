import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { theme } from 'settings/variables';
import { getRequired } from 'common/helpers/validationHelpers';
import { FormTextInput } from 'common/components/form/FormTextInput';

import { SelectOption } from 'common/typings/selectTypings';
import { FormSelect } from 'common/components/form/FormSelect';
import { Button } from 'common/styled';
import { useCompaniesServices } from 'features/Companies/companiesServices';
import {
    ConsultantReservationFormValues,
    ReservationFormValues,
} from 'features/Reservations/reservationsTypings';
import { useReservationServices } from 'features/Reservations/reservationsServices';
import { LoadingButton } from 'common/components/LoadingButton/LoadingButton';
import { FormActionsWrapper } from 'common/components/form/FormActionsWrapper';

const validationSchema = Yup.object().shape({
    title: getRequired('Title'),
    description: getRequired('Description'),
    date: getRequired('Date'),
    startTime: getRequired('Start time'),
    endTime: getRequired('End time'),
});

interface Props {
    initialValues?: Partial<ConsultantReservationFormValues>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConsultantReservationForm = ({ initialValues, setIsModalOpen }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [companyOptions, setCompanyOptions] = useState<SelectOption[]>([]);

    const formControl = useForm<ConsultantReservationFormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
    });

    const { createReservationForConsultant } = useReservationServices();
    const { getAllCompanies } = useCompaniesServices();

    const getCompanies = () => {
        getAllCompanies().then(companiesData => {
            const options = companiesData.map(company => ({
                label: company.name,
                value: company.id,
            }));
            setCompanyOptions(options);
        });
    };

    useEffect(() => {
        getCompanies();
    }, []);

    const onSubmit = (reservationFormValues: ReservationFormValues) => {
        setIsLoading(true);

        createReservationForConsultant(reservationFormValues)
            .then(() => {
                toast.success('Created reservation');
                setIsModalOpen(false);
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
                    <FormTextInput name="description" label="Description" multiline rows={5} />
                    <FormTextInput name="date" label="Date" type="date" />

                    <div className="flex gap-2">
                        <FormTextInput name="startTime" label="Start time" type="time" />
                        <FormTextInput name="endTime" label="End time" type="time" />
                    </div>
                    <FormSelect name="company" label="Company" options={companyOptions} />
                    <FormActionsWrapper>
                        <Button
                            backgroundColor={theme.palette.primary.dark}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <LoadingButton isLoading={isLoading}>Save</LoadingButton>
                    </FormActionsWrapper>
                </form>
            </FormProvider>
        </>
    );
};
