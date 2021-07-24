import React, { useContext } from 'react';
import { format } from 'date-fns';

import { ConfirmModal } from 'common/components/ConfirmModal';
import { ConfirmModalProps } from 'common/components/ConfirmModal/ConfirmModal';
import { Button } from 'common/styled';
import {
    removeReservation,
    ReservationsContext,
    setReservationForFreeSlot,
} from 'features/reservations/reservationsContext';
import {
    Company,
    Reservation,
    SlotState,
    TimeSlot,
} from 'features/reservations/reservationsTypings';
import { getSlotState } from 'features/reservations/reservationsHelpers';
import { TimeSlotCard } from '../TimeSlotCard';
import * as S from './companyColumnStyles';

interface Props {
    company: Company;
    currentReservation?: Reservation;
}

type ModalProps = Omit<ConfirmModalProps, 'isOpen' | 'setIsOpen'>;

export const CompanyColumn = ({ company }: Props) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
    const [confirmModalProps, setConfirmModalProps] = React.useState<ModalProps>();

    const {
        dispatch,
        state: { reservations },
    } = useContext(ReservationsContext);

    const companyReservation = reservations.find(({ companyId }) => companyId === company.id);

    const handleReservationChange = (timeSlot: TimeSlot) => {
        dispatch(removeReservation(company.id));
        dispatch(setReservationForFreeSlot({ timeSlot, companyId: company.id }));
    };

    const handleSlotClick = (timeSlot: TimeSlot, slotState: SlotState) => {
        if (companyReservation) {
            setConfirmModalProps({
                handleAction: () => handleReservationChange(timeSlot),
                headerText: 'Reservation change confirmation',
                text: 'Are you sure you want to change the reservation? It will remove current reservation for this company',
            });
            setIsConfirmModalOpen(true);

            return;
        }
        if (slotState === SlotState.Free) {
            dispatch(setReservationForFreeSlot({ timeSlot, companyId: company.id }));
        }
    };

    const handleReservationRemoval = () => {
        dispatch(removeReservation(company.id));
    };

    const openRemovalModal = () => {
        setConfirmModalProps({
            handleAction: handleReservationRemoval,
            headerText: 'Reservation removal confirmation',
            text: 'Are you sure you want to remove the reservation?',
        });

        setIsConfirmModalOpen(true);
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
                        <Button onClick={() => openRemovalModal()}>remove</Button>
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
                            {timeSlots.map(timeSlot => {
                                const slotState = getSlotState(timeSlot, reservations, company.id);
                                return (
                                    <TimeSlotCard
                                        key={timeSlot.startDate}
                                        timeSlot={timeSlot}
                                        handleClick={() =>
                                            slotState === SlotState.Free &&
                                            handleSlotClick(timeSlot, slotState)
                                        }
                                        slotState={slotState}
                                    />
                                );
                            })}
                        </S.TimeSlotGroupWrapper>
                    </S.TimeSlotGroupWrapper>
                ))}
            </S.TimeSlotGroupsWrapper>
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                setIsOpen={setIsConfirmModalOpen}
                {...confirmModalProps}
            />
        </S.ColumnWrapper>
    );
};
