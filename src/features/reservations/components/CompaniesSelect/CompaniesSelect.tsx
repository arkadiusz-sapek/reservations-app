import React, { useContext, useEffect, useState } from 'react';

import { breakpointsValues } from 'settings/variables';
import { MultiSelectOptionType, SelectsValues } from 'common/commonTypings';
import { Select } from 'common/components/Select';
import { useViewport } from 'common/hooks/useViewport';
import {
    ReservationsContext,
    setSelectedCompanies,
} from 'features/reservations/reservationsContext';
import { transformCompanyToOption } from 'features/reservations/reservationsHelpers';
import { Company } from 'features/reservations/reservationsTypings';

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

    useEffect(() => {
        setIsMobile(width < breakpointsValues.lg);
        const elements = selectedCompanies as MultiSelectOptionType[];
        if (isMobile && selectedCompanies?.length > 1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(setSelectedCompanies([elements?.reverse()[0]] as any));
        }
    }, [width]);

    const options = companies.map(transformCompanyToOption);

    const handleTagSelect = (selectedOptions: SelectsValues) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selected = selectedOptions as any;
        dispatch(setSelectedCompanies(Array.isArray(selected) ? selected : [selected]));
    };

    return (
        <Select
            isMulti={!isMobile}
            label="Companies"
            value={selectedCompanies}
            tags={options}
            handleTagSelect={handleTagSelect}
        />
    );
};
