import React, { createContext, useReducer } from 'react';

import { SelectOption } from 'common/commonTypings';
import { Reservation } from './reservationsTypings';

export interface ReservationsState {
    reservations: Reservation[];
    selectedCompanies: SelectOption[];
}

type Action =
    | { type: 'SET_RESERVATION'; payload: { reservation: Reservation } }
    | { type: 'REMOVE_RESERVATION'; payload: { companyId: number } }
    | { type: 'SET_SELECTED_COMPANIES'; payload: { selectedCompanies: SelectOption[] } };

interface ContextState {
    state: ReservationsState;
    dispatch: (action: Action) => void;
}

const defaultInitialState: ReservationsState = {
    reservations: [],
    selectedCompanies: [],
};

const setReservationForFreeSlot = (reservation: Reservation): Action => ({
    type: 'SET_RESERVATION',
    payload: { reservation },
});

const removeReservation = (companyId: number): Action => ({
    type: 'REMOVE_RESERVATION',
    payload: { companyId },
});

const setSelectedCompanies = (selectedCompanies: SelectOption[]): Action => ({
    type: 'SET_SELECTED_COMPANIES',
    payload: { selectedCompanies },
});

function managerWorkplacesReducer(state: ReservationsState, action: Action): ReservationsState {
    switch (action.type) {
        case 'SET_RESERVATION':
            return { ...state, reservations: [...state.reservations, action.payload.reservation] };
        case 'REMOVE_RESERVATION':
            return {
                ...state,
                reservations: state.reservations.filter(
                    reservation => action.payload.companyId !== reservation.companyId,
                ),
            };
        case 'SET_SELECTED_COMPANIES':
            return { ...state, selectedCompanies: action.payload.selectedCompanies };

        default:
            return state;
    }
}

const ReservationsContext = createContext<ContextState>({
    state: defaultInitialState,
    dispatch: () => {
        /* do nothing */
    },
});

interface Props {
    children: React.ReactNode;
    values?: ReservationsState;
}

const ReservationsContextProvider = ({ children, values }: Props): JSX.Element => {
    const [state, dispatch] = useReducer(managerWorkplacesReducer, values || defaultInitialState);

    return (
        <ReservationsContext.Provider value={{ state, dispatch }}>
            {children}
        </ReservationsContext.Provider>
    );
};

export {
    ReservationsContextProvider,
    ReservationsContext,
    setReservationForFreeSlot,
    removeReservation,
    setSelectedCompanies,
};
