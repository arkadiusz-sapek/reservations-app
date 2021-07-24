import { SelectsValues } from 'common/commonTypings';
import React, { createContext, useReducer } from 'react';

import { Reservation } from './reservationsTypings';

export interface ReservationState {
    reservations: Reservation[];
    selectedCompanies: SelectsValues;
}

type Action =
    | { type: 'SET_RESERVATION'; payload: { reservation: Reservation } }
    | { type: 'REMOVE_RESERVATION'; payload: { companyId: number } }
    | { type: 'SET_SELECTED_COMPANIES'; payload: { selectedCompanies: SelectsValues } };

interface ContextState {
    state: ReservationState;
    dispatch: (action: Action) => void;
}

const defaultInitialState: ReservationState = {
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

const setSelectedCompanies = (selectedCompanies: SelectsValues): Action => ({
    type: 'SET_SELECTED_COMPANIES',
    payload: { selectedCompanies },
});

function managerWorkplacesReducer(state: ReservationState, action: Action): ReservationState {
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
    values?: ReservationState;
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
