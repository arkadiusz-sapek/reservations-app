import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { theme } from 'settings/variables';
import { routes } from 'settings/routes';
import { RootErrorBoundary } from 'core/components/RootErrorBoundary';
import { ReservationsContextProvider } from 'features/Reservations/reservationsContext';

import { LoginPage } from 'features/Login';
import { ReservationsPage } from 'features/Reservations/ReservationsPage';

export const App = () => (
    <RootErrorBoundary>
        <ThemeProvider theme={theme}>
            <Router>
                {/* <AuthorizationContextProvider> */}
                <Switch>
                    <Route path={routes.loginPanel} component={LoginPage} />
                    <ReservationsContextProvider>
                        <Route path={routes.reservations} component={ReservationsPage} />
                    </ReservationsContextProvider>
                </Switch>
                {/* </AuthorizationContextProvider> */}
            </Router>
        </ThemeProvider>
    </RootErrorBoundary>
);
