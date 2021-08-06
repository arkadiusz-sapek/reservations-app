import React, { createContext, useReducer } from 'react';
import { addDays } from 'date-fns';

import { CalendarDateRange, Reservation } from 'features/Reservations/reservationsTypings';

export interface ReservationsState {
    calendarDateRange: CalendarDateRange;
    reservations: Reservation[];
}

const initialState: ReservationsState = {
    calendarDateRange: {
        start: new Date().toString(),
        end: addDays(new Date(), 7).toString(),
    },
    reservations: [],
};

type Action =
    | { type: 'SET_DATE_RANGE'; payload: { dateRange: CalendarDateRange } }
    | { type: 'SET_RESERVATIONS'; payload: { reservations: Reservation[] } };

const setDateRange = (dateRange: CalendarDateRange): Action => ({
    type: 'SET_DATE_RANGE',
    payload: { dateRange },
});

const setReservations = (reservations: Reservation[]): Action => ({
    type: 'SET_RESERVATIONS',
    payload: { reservations },
});

interface ContextState {
    state: ReservationsState;
    dispatch: (action: Action) => void;
}

function authReducer(state: ReservationsState, action: Action): ReservationsState {
    switch (action.type) {
        case 'SET_DATE_RANGE':
            return { ...state, calendarDateRange: action.payload.dateRange };
        case 'SET_RESERVATIONS':
            return { ...state, reservations: action.payload.reservations };

        default:
            return state;
    }
}

const ReservationsContext = createContext<ContextState>({
    state: initialState,
    dispatch: () => {
        /* do nothing */
    },
});

interface Props {
    children: React.ReactNode;
    values?: ReservationsState;
}

const ReservationsContextProvider = ({ children, values }: Props): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, values || initialState);

    return (
        <ReservationsContext.Provider value={{ state, dispatch }}>
            {children}
        </ReservationsContext.Provider>
    );
};

export { ReservationsContextProvider, ReservationsContext, setReservations, setDateRange };
