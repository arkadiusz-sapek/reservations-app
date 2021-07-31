import React, { useContext } from 'react';

import { ConfirmModal } from 'common/components/ConfirmModal';
import { ConfirmModalProps } from 'common/components/ConfirmModal/ConfirmModal';
import { Button } from 'common/styled';
import {
    removeReservation,
    ReservationsContext,
    setReservationForFreeSlot,
} from 'features/Reservations/reservationsContext';
import {
    Company,
    Reservation,
    SlotState,
    TimeSlot,
} from 'features/Reservations/reservationsTypings';
import {
    getDate,
    getDayOfWeek,
    getSlotState,
    getTime,
} from 'features/Reservations/reservationsHelpers';
import { TimeSlotCard } from '../TimeSlotCard';
import * as S from './companyColumnStyles';

const modalRemoveProps = {
    headerText: 'Reservation removal confirmation',
    text: 'Are you sure you want to remove the reservation?',
};

const modalChangeReservationProps = {
    headerText: 'Reservation change confirmation',
    text: 'Are you sure you want to change the reservation? It will remove current reservation for this company',
};

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

    const handleSlotClick = (timeSlot: TimeSlot) => {
        const slotState = getSlotState(timeSlot, reservations, company.id);

        switch (true) {
            case slotState !== SlotState.Free: {
                return;
            }
            case !!companyReservation: {
                setConfirmModalProps({
                    handleAction: () => handleReservationChange(timeSlot),
                    ...modalChangeReservationProps,
                });
                setIsConfirmModalOpen(true);
                return;
            }
            default: {
                dispatch(setReservationForFreeSlot({ timeSlot, companyId: company.id }));
            }
        }
    };

    const handleReservationRemoval = () => {
        dispatch(removeReservation(company.id));
    };

    const openRemovalModal = () => {
        setConfirmModalProps({
            handleAction: handleReservationRemoval,
            ...modalRemoveProps,
        });

        setIsConfirmModalOpen(true);
    };

    return (
        <S.ColumnWrapper>
            <S.HeaderWrapper>
                <S.CompanyHeader data-testid={`companyHeader-${company.name}`}>
                    {company.name}
                </S.CompanyHeader>
            </S.HeaderWrapper>
            <S.ColumnContentWrapper>
                {companyReservation ? (
                    <>
                        <h6>Reservation</h6>
                        <S.ReservationTimeWrapper dateTime={companyReservation.timeSlot.startDate}>
                            <div data-testid="reservationDay">
                                {getDayOfWeek(companyReservation.timeSlot.startDate)} (
                                {getDate(companyReservation.timeSlot.startDate)})
                            </div>
                            <div data-testid="reservationTime">
                                {getTime(companyReservation.timeSlot.startDate)}-
                                {getTime(companyReservation.timeSlot.endDate)}
                            </div>
                        </S.ReservationTimeWrapper>
                        <Button
                            onClick={() => openRemovalModal()}
                            data-testid="removeReservationButton"
                        >
                            remove
                        </Button>
                    </>
                ) : (
                    <h6>No reservation</h6>
                )}
            </S.ColumnContentWrapper>

            <S.TimeSlotGroupsWrapper>
                {Object.entries(company.days).map(([groupDate, timeSlots]) => (
                    <S.TimeSlotGroupWrapper key={groupDate}>
                        <S.TimeSlotGroupHeader data-testid="timeSlotGroupHeader">
                            <time dateTime={groupDate}>
                                {getDayOfWeek(groupDate)} ({getDate(groupDate)})
                            </time>
                        </S.TimeSlotGroupHeader>
                        <S.TimeSlotGroupWrapper>
                            {timeSlots.map(timeSlot => (
                                <S.TimeSlotButton
                                    key={timeSlot.startDate}
                                    onClick={() => handleSlotClick(timeSlot)}
                                >
                                    <TimeSlotCard
                                        timeSlot={timeSlot}
                                        slotState={getSlotState(timeSlot, reservations, company.id)}
                                    />
                                </S.TimeSlotButton>
                            ))}
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
