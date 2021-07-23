import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { routes } from 'settings/routes';
import { RootErrorBoundary } from 'core/components/RootErrorBoundary';
import { globalStyles } from 'core/globalStyles';
import { ReservationsPage } from 'features/reservations/ReservationsPage';
import { Global } from '@emotion/react';

export const App = () => (
    <RootErrorBoundary>
        <Global styles={globalStyles} />
        <Router>
            <Switch>
                <Route path={routes.reservations} component={ReservationsPage} />
                <Redirect exact from="*" to={routes.reservations} />
            </Switch>
        </Router>
    </RootErrorBoundary>
);
