import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

import { getRequired } from 'common/helpers/validationHelpers';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { FormRangePicker } from 'common/components/form/FormDateTimePicker';
import { AuthContext } from 'common/contexts/AuthContext';
import { SelectOption } from 'common/typings/selectTypings';
import { FormSelect } from 'common/components/form/FormSelect';
import { Button } from 'common/styled';
import { useCompaniesServices } from 'features/Companies/companiesServices';
import { Reservation, ReservationFormValues } from 'features/Reservations/reservationsTypings';
import { useReservationServices } from 'features/Reservations/reservationsServices';

const validationSchema = Yup.object().shape({
    title: getRequired('Title'),
    // dateRange: getRequired('Date range'),
    // company: getRequired('Company'),
});

interface Props {
    initialValues?: Reservation;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConsultantReservationForm = ({ initialValues }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [companyOptions, setCompanyOptions] = useState<SelectOption[]>([]);

    const {
        state: { user },
    } = useContext(AuthContext);

    const formControl = useForm<Reservation>({
        resolver: yupResolver(validationSchema),
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
                    <FormTextInput name="description" label="Description" multiline rows={5} />

                    <div className="flex">
                        <div className="mr-4">
                            <FormTextInput name="startDate" label="Start date" type="date" />
                        </div>
                        <FormTextInput name="startTime" label="Start time" type="time" />
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <FormTextInput name="endDate" label="End date" type="date" />
                        </div>
                        <FormTextInput name="endTime" label="End time" type="time" />
                    </div>

                    <FormSelect name="company" label="Company" options={companyOptions} />
                    <div className="flex justify-end mt-8 ">
                        <Button color="primary" type="submit" data-testid="submitButton">
                            Save
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
