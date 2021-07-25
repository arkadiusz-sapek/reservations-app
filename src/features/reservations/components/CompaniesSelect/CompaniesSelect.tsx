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

    useEffect(() => {
        setIsMobile(width < breakpointsValues.lg);
        if (isMobile && selectedCompanies?.length > 1) {
            dispatch(setSelectedCompanies([selectedCompanies?.reverse()[0]]));
        }
    }, [width]);

    const options = companies.map(transformCompanyToOption);

    const handleTagSelect = (selectedOptions: SelectValues) => {
        dispatch(
            setSelectedCompanies(
                Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions],
            ),
        );
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
