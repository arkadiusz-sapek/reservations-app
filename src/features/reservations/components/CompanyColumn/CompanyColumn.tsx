import React, { useContext } from 'react';
import { format } from 'date-fns';

import { ConfirmModal } from 'common/components/ConfirmModal';
import { Button } from 'common/styled';
import {
    removeReservation,
    ReservationsContext,
    setReservationForFreeSlot,
} from 'features/reservations/reservationsContext';
import { Company, Reservation, TimeSlot } from 'features/reservations/reservationsTypings';
import { TimeSlotCard } from '../TimeSlotCard';
import * as S from './companyColumnStyles';

interface Props {
    company: Company;
    currentReservation?: Reservation;
}

export const CompanyColumn = ({ company }: Props) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

    const {
        dispatch,
        state: { reservations },
    } = useContext(ReservationsContext);

    const companyReservation = reservations.find(({ companyId }) => companyId === company.id);

    const handleSlotClick = (timeSlot: TimeSlot) => {
        dispatch(setReservationForFreeSlot({ timeSlot, companyId: company.id }));
    };

    const handleReservationRemoval = () => {
        dispatch(removeReservation(company.id));
    };

    return (
        <S.ColumnWrapper>
            <S.HeaderWrapper>
                <S.CompanyHeader>{company.name}</S.CompanyHeader>
            </S.HeaderWrapper>
            <S.ColumnContentWrapper>
                {companyReservation ? (
                    <>
                        <h6>Reservation</h6>
                        <div>
                            {format(new Date(companyReservation.timeSlot.startDate), 'EEEE')} (
                            {format(new Date(companyReservation.timeSlot.startDate), 'yyyy-MM-dd')})
                        </div>
                        <div>
                            {format(new Date(companyReservation.timeSlot.startDate), 'hh:mm')}-
                            {format(new Date(companyReservation.timeSlot.endDate), 'hh:mm')}
                        </div>
                        <Button onClick={() => setIsConfirmModalOpen(true)}>remove</Button>
                    </>
                ) : (
                    <h6>No reservation</h6>
                )}
            </S.ColumnContentWrapper>

            <S.TimeSlotGroupsWrapper>
                {Object.entries(company.days).map(([date, timeSlots]) => (
                    <S.TimeSlotGroupWrapper key={date}>
                        <S.TimeSlotGroupHeader>
                            {format(new Date(date), 'EEEE')} ({format(new Date(date), 'yyyy-MM-dd')}
                            )
                        </S.TimeSlotGroupHeader>
                        <S.TimeSlotGroupWrapper>
                            {timeSlots.map(timeSlot => (
                                <TimeSlotCard
                                    key={timeSlot.startDate}
                                    timeSlot={timeSlot}
                                    handleClick={() => handleSlotClick(timeSlot)}
                                />
                            ))}
                        </S.TimeSlotGroupWrapper>
                    </S.TimeSlotGroupWrapper>
                ))}
            </S.TimeSlotGroupsWrapper>
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                setIsOpen={setIsConfirmModalOpen}
                handleAction={handleReservationRemoval}
                headerText="Reservation removal confirmation"
                text="Are you sure you want to remove the reservation?"
            />
        </S.ColumnWrapper>
    );
};
