import React, { useContext, useEffect, useState } from 'react';

import { breakpointsValues } from 'settings/variables';
import { SelectValues } from 'common/commonTypings';
import { Select } from 'common/components/Select';
import { useViewport } from 'common/hooks/useViewport';
import { ReservationsContext, setSelectedCompanies } from '../../reservationsContext';
import { transformCompanyToOption } from '../../reservationsHelpers';
import { Company } from '../../reservationsTypings';

interface Props {
    companies: Company[];
}

export const CompaniesSelect = ({ companies }: Props) => {
    const [isMobile, setIsMobile] = useState(false);
    const {
        dispatch,
        state: { selectedCompanies },
    } = useContext(ReservationsContext);
    const { width } = useViewport();

    const detectAndHandleMobile = () => {
        setIsMobile(width < breakpointsValues.lg);
        if (isMobile && selectedCompanies?.length > 1) {
            const lastSelectedCompany = selectedCompanies?.reverse()[0];

            dispatch(setSelectedCompanies([lastSelectedCompany]));
        }
    };

    useEffect(() => {
        detectAndHandleMobile();
    }, [width]);

    const options = companies.map(transformCompanyToOption);

    const handleTagSelect = (selectedOptions: SelectValues) => {
        const newSelectedCompanies = Array.isArray(selectedOptions)
            ? selectedOptions
            : [selectedOptions];

        dispatch(setSelectedCompanies(newSelectedCompanies));
    };

    return (
        <Select
            isMulti={!isMobile}
            label="Companies"
            value={selectedCompanies}
            options={options}
            handleOptionsSelect={handleTagSelect}
        />
    );
};
