import React, { useContext, useRef, useState } from 'react';
import format from 'date-fns/format';
import FullCalendar, { DateSelectArg, EventSourceInput } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

import { AuthContext } from 'common/contexts/AuthContext';
import { UserRole } from 'common/typings/authTypings';
import { Modal } from 'common/components/Modal';
import {
    Reservation,
    ReservationDateInitialValues,
} from 'features/Reservations/reservationsTypings';
import { ConsultantReservationForm } from '../ConsultantReservationForm';
import { CompanyReservationForm } from '../CompanyReservationForm';
import * as S from '../../reservationsPageStyles';

interface Props {
    reservations: Reservation[];
}

export const BigCalendar = ({ reservations }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '2020-08-01', end: '2020-08-07' });

    const [formInitialDateValues, setFormInitialDateValues] =
        useState<ReservationDateInitialValues>();
    const ref: any = useRef(null);
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

    const setDateRangeHandler = () => {
        console.log('odpalam');
        setTimeout(() => {
            const calendarApi = ref.current.getApi();

            console.log(calendarApi);
            console.log(calendarApi.setOption);

            // calendarApi.setOption?.('validRange', {
            //     start: '2021-08-22T00:00:00+02:00',
            //     end: '2021-08-28T00:00:00+02:00',
            // });
        }, 1000);
    };

    return (
        <S.BigCalendarWrapper>
            <FullCalendar
                ref={ref}
                selectable
                events={events}
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                eventClick={() => setDateRangeHandler()}
                // select={data => handleSelect(data)}
                select={data => setDateRangeHandler()}
                visibleRange={dateRange}
                // validRange={{ start: '2020-08-09', end: '2020-08-16' }}
                datesSet={d => {
                    // setDateRangeHandler();
                    console.log(d);
                }}
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
        </S.BigCalendarWrapper>
    );
};
