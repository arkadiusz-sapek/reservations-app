import React, { useState } from 'react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import Calendar from 'react-calendar';

interface Props {}

export const SmallCalendar = () => {
    const [value, onChange] = useState([new Date(), new Date('2021-08-26')]);

    const handleSelect = (val: any) => {
        console.log('nowa rezerwacja');
        console.log(val);
        onChange(val);
        console.log({ [val]: 'dupa' });
        console.log(format(new Date(val), 'yyyy-MM-dd'));
    };

    return (
        <>
            <Calendar onChange={handleSelect} value={value} />
        </>
    );
};
