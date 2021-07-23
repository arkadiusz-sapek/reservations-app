import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { routes } from 'settings/routes';
import { ReservationsList } from 'features/reservations/ReservationsPage';

export const App = () => (
    <Router>
        <Switch>
            <Route path={routes.reservations} component={ReservationsList} />
        </Switch>
    </Router>
);
