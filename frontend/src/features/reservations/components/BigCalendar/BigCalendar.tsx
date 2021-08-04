import React, { useContext, useState } from 'react';
import { Calendar, Views, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import { AuthContext } from 'common/contexts/AuthContext';
import { UserRole } from 'common/typings/authTypings';
import { Modal } from 'common/components/Modal';
import {
    ConsultantReservationFormValues,
    Reservation,
} from 'features/Reservations/reservationsTypings';
import { ConsultantReservationForm } from '../ConsultantReservationForm';
import { CompanyReservationForm } from '../CompanyReservationForm';

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

export const BigCalendar = ({ reservations }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [consultantFormInitialValues, setConsultantFormInitialValues] =
        useState<Partial<ConsultantReservationFormValues>>();

    const {
        state: { user },
    } = useContext(AuthContext);

    const handleSelect = (slotInfo: SlotInfo) => {
        setConsultantFormInitialValues({
            date: format(new Date(slotInfo.start.toLocaleString()), 'yyyy-MM-dd'),
            startTime: format(new Date(slotInfo.start.toLocaleString()), 'HH:mm'),
            endTime: format(new Date(slotInfo.end.toLocaleString()), 'HH:mm'),
        });
        setIsModalOpen(true);
    };

    console.log(reservations);

    const events = reservations.map(({ startDate, endDate, ...rest }) => ({
        start: new Date(startDate),
        end: new Date(endDate),
        ...rest,
    }));

    console.log(events);

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
                    <CompanyReservationForm setIsModalOpen={setIsModalOpen} />
                ) : (
                    <ConsultantReservationForm
                        setIsModalOpen={setIsModalOpen}
                        initialValues={consultantFormInitialValues}
                    />
                )}
            </Modal>
        </>
    );
};
