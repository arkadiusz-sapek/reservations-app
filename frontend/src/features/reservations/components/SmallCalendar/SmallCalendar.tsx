import React, { useContext } from 'react';

import Calendar from 'react-calendar';
import { ReservationsContext, setDateRange } from 'common/contexts/ReservationsContext';
import * as S from './smallCalendarStyles';

export const SmallCalendar = () => {
    const { dispatch } = useContext(ReservationsContext);

    const handleSelect = ([start, end]: Date[]) => {
        dispatch(setDateRange({ start: start.toDateString(), end: end.toDateString() }));
    };

    return (
        <S.SmallCalendarWrapperWithStyles>
            <Calendar className="h-96" onChange={handleSelect} selectRange />
        </S.SmallCalendarWrapperWithStyles>
    );
};
