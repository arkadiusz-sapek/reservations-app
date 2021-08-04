import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';

import { routes } from 'settings/routes';
import { Button } from 'common/styled';
import { getRequired } from 'common/helpers/validationHelpers';
import { FormTextInput } from 'common/components/form/FormTextInput';
import { useCompaniesServices } from '../companiesServices';
import { Company, CreateCompanyRequest } from '../companiesTypings';

const validationSchema = Yup.object().shape({
    name: getRequired('Name'),
    description: getRequired('Description'),
    reservationAvailabilityStart: getRequired('Availability start'),
    reservationAvailabilityEnd: getRequired('Availability end'),
});

interface Props {
    initialValues?: Company;
}

export const CompanyForm = ({ initialValues }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const formControl = useForm<Company>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
    });

    const { createCompanyProfile } = useCompaniesServices();

    const onSubmit = (companyFormValues: CreateCompanyRequest) => {
        setIsLoading(true);

        createCompanyProfile(companyFormValues).then(() => {
            history.push(routes.reservations);
        });
    };

    return (
        <>
            <FormProvider {...formControl}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <FormTextInput name="name" label="Name" />
                    <FormTextInput name="description" label="Description" multiline rows={5} />
                    <FormTextInput
                        name="reservationAvailabilityStart"
                        label="Availability start"
                        type="time"
                    />
                    <FormTextInput
                        name="reservationAvailabilityEnd"
                        label="Availability end"
                        type="time"
                    />
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
