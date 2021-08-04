import React, { createContext, useEffect, useReducer } from 'react';

import { User } from 'common/typings/authTypings';
import { TOKEN_COOKIE_NAME } from 'settings/variables';
import Cookies from 'js-cookie';

export interface AuthState {
    user?: User;
    token?: string;
}

const cookieToken = Cookies.get(TOKEN_COOKIE_NAME);

const initialState: AuthState = {
    token: cookieToken,
};

type Action =
    | { type: 'SET_TOKEN'; payload: { token: string } }
    | { type: 'SET_USER_DATA'; payload: { user: User } }
    | { type: 'RESET_AUTH_STATE' };

interface ContextState {
    state: AuthState;
    dispatch: (action: Action) => void;
}

const setToken = (token: string): Action => ({
    type: 'SET_TOKEN',
    payload: { token },
});

const setUserData = (user: User): Action => ({
    type: 'SET_USER_DATA',
    payload: { user },
});

const resetAuthState = (): Action => ({
    type: 'RESET_AUTH_STATE',
});

function authReducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload.token };
        case 'SET_USER_DATA':
            return { ...state, user: action.payload.user };
        case 'RESET_AUTH_STATE':
            return {};

        default:
            return state;
    }
}

const AuthContext = createContext<ContextState>({
    state: {},
    dispatch: () => {
        /* do nothing */
    },
});

interface Props {
    children: React.ReactNode;
    values?: AuthState;
}

const AuthContextProvider = ({ children, values }: Props): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, values || initialState);

    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext, setToken, setUserData, resetAuthState };
