import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { routes } from 'settings/routes';
import { RootErrorBoundary } from 'core/components/RootErrorBoundary';
import { ReservationsPage } from 'features/reservations/ReservationsPage';
import { ReservationsContextProvider } from 'features/reservations/reservationsContext';
import { theme } from 'settings/variables';

export const App = () => (
    <RootErrorBoundary>
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <ReservationsContextProvider>
                        <Route path={routes.reservations} component={ReservationsPage} />
                    </ReservationsContextProvider>
                    <Redirect exact from="*" to={routes.reservations} />
                </Switch>
            </Router>
        </ThemeProvider>
    </RootErrorBoundary>
);
