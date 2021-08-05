import React, { useContext, useState } from 'react';
import format from 'date-fns/format';
import FullCalendar, { DateSelectArg, EventSourceInput } from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

import { AuthContext } from 'common/contexts/AuthContext';
import { UserRole } from 'common/typings/authTypings';
import { Modal } from 'common/components/Modal';
import {
    Reservation,
    ReservationDateInitialValues,
} from 'features/Reservations/reservationsTypings';
import { ConsultantReservationForm } from '../ConsultantReservationForm';
import { CompanyReservationForm } from '../CompanyReservationForm';

interface Props {
    reservations: Reservation[];
}

export const BigCalendar = ({ reservations }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formInitialDateValues, setFormInitialDateValues] =
        useState<ReservationDateInitialValues>();

    const {
        state: { user },
    } = useContext(AuthContext);

    const handleSelect = (slotInfo: DateSelectArg) => {
        setFormInitialDateValues({
            date: format(new Date(slotInfo.start), 'yyyy-MM-dd'),
            startTime: format(new Date(slotInfo.start), 'HH:mm'),
            endTime: format(new Date(slotInfo.end), 'HH:mm'),
        });
        setIsModalOpen(true);
    };

    const events: EventSourceInput = reservations.map(({ startDate, endDate, title }) => ({
        start: new Date(startDate),
        end: new Date(endDate),
        title,
    }));

    return (
        <>
            <FullCalendar
                selectable
                events={events}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                eventClick={() => console.log('click')}
                select={data => handleSelect(data)}

                // dateClick={() => console.log('dateclick')}
            />
            <Modal isOpen={isModalOpen}>
                {user?.role === UserRole.Client ? (
                    <CompanyReservationForm
                        setIsModalOpen={setIsModalOpen}
                        initialValues={formInitialDateValues}
                    />
                ) : (
                    <ConsultantReservationForm
                        setIsModalOpen={setIsModalOpen}
                        initialValues={formInitialDateValues}
                    />
                )}
            </Modal>
        </>
    );
};
