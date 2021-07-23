import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { routes } from 'settings/routes';
import { ReservationsPage } from 'features/reservations/ReservationsPage';

export const App = () => (
    <Router>
        <Switch>
            <Route path={routes.reservations} component={ReservationsPage} />
            <Redirect exact from="*" to={routes.reservations} />
        </Switch>
    </Router>
);
