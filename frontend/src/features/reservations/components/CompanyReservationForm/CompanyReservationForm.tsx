import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { CompanyReservationFormValues } from 'features/Reservations/reservationsTypings';
import { getRequired } from 'common/helpers/validationHelpers';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { useReservationServices } from 'features/Reservations/reservationsServices';
import { UserRole } from 'common/typings/authTypings';

import { useUserServices } from 'core/services/userServices';
import { FormSelect } from 'common/components/form/FormSelect';
import { SelectOption } from 'common/typings/selectTypings';
import { Button } from 'common/styled';
import { FormActionsWrapper } from 'common/components/form/FormActionsWrapper';
import { theme } from 'settings/variables';
import { LoadingButton } from 'common/components/LoadingButton';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    title: getRequired('Title'),
    description: getRequired('Description'),
    date: getRequired('Date'),
    startTime: getRequired('Start time'),
    endTime: getRequired('End time'),
    consultant: Yup.object().required(`Consultant is required`),
});

interface Props {
    initialValues?: Partial<CompanyReservationFormValues>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompanyReservationForm = ({ initialValues, setIsModalOpen }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [consultantOptions, setConsultantsOptions] = useState<SelectOption[]>([]);

    const formControl = useForm<CompanyReservationFormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
    });

    const { createReservationForCompany } = useReservationServices();
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

    const onSubmit = (reservationFormValues: CompanyReservationFormValues) => {
        setIsLoading(true);

        createReservationForCompany(reservationFormValues)
            .then(() => {
                setIsModalOpen(false);
                toast.success('Created reservation');
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
                    <FormSelect name="consultant" label="Consultant" options={consultantOptions} />
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
