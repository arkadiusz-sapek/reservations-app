import React from 'react';
import { ThemeProvider } from '@emotion/react';

import { theme } from 'settings/variables';
import { RootErrorBoundary } from 'core/components/RootErrorBoundary';
import { ReservationsPage } from 'features/reservations/ReservationsPage';
import { ReservationsContextProvider } from 'features/reservations/reservationsContext';

export const App = () => (
    <RootErrorBoundary>
        <ThemeProvider theme={theme}>
            <ReservationsContextProvider>
                <ReservationsPage />
            </ReservationsContextProvider>
        </ThemeProvider>
    </RootErrorBoundary>
);
