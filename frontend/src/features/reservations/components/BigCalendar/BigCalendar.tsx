import React, { useContext, useState } from 'react';
import { Calendar, Views, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import { AuthContext } from 'common/contexts/AuthContext';
import { UserRole } from 'common/typings/authTypings';
import { Modal } from 'common/components/Modal';
import { Reservation } from 'features/Reservations/reservationsTypings';
import { ConsultantReservationForm } from '../ConsultantReservationForm';
import { CompanyReservationForm } from '../CompanyReservationForm';

const events = [
    {
        id: 0,
        title: 'Board meeting',
        start: new Date(2021, 7, 1, 9, 2, 0),
        end: new Date(2021, 7, 1, 13, 0, 0),
    },

    {
        id: 1,
        title: 'Board meeting2',
        start: new Date(2021, 7, 1, 10, 2, 0),
        end: new Date(2021, 7, 1, 14, 0, 0),
    },
    {
        id: 2,
        title: 'spotkanie kawusiowe',
        start: new Date(2021, 7, 1, 11, 2, 0),
        end: new Date(2021, 7, 1, 12, 0, 0),
    },
    {
        id: 3,
        title: 'spotkanie kawusiowe',
        start: new Date(2021, 7, 1, 11, 2, 0),
        end: new Date(2021, 7, 1, 12, 0, 0),
    },
];

interface Props {
    reservations: Reservation[];
}

const locales = {
    // eslint-disable-next-line global-require
    'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const BigCalendar = (_props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        state: { user },
    } = useContext(AuthContext);

    const handleSelect = (_slotInfo: SlotInfo) => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Calendar
                selectable
                localizer={localizer}
                events={events}
                defaultView={Views.WEEK}
                scrollToTime={new Date()}
                defaultDate={new Date()}
                onSelectEvent={(event: any) => alert(event.title)}
                onSelectSlot={handleSelect}
                views={[Views.WEEK]}
            />
            <Modal isOpen={isModalOpen}>
                {user?.role === UserRole.Client ? (
                    <CompanyReservationForm />
                ) : (
                    <ConsultantReservationForm />
                )}
            </Modal>
        </>
    );
};
