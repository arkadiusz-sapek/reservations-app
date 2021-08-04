import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { theme } from 'settings/variables';
import { routes } from 'settings/routes';
import { AuthGuard } from 'core/components/AuthGuard';
import { RootErrorBoundary } from 'core/components/RootErrorBoundary';
import { UserRole } from 'common/typings/authTypings';
import { AuthContextProvider } from 'common/contexts/AuthContext';
import { MainWrapper } from 'common/components/MainWrapper';

import { LoginPage } from 'features/Login';
import { ReservationsPage } from 'features/Reservations/ReservationsPage';
import { CompaniesPage } from 'features/Companies/CompaniesPage';
import { RegisterPage } from 'features/Register';

export const App = () => (
    <RootErrorBoundary>
        <ThemeProvider theme={theme}>
            <Router>
                <AuthContextProvider>
                    <Switch>
                        <Route path={routes.loginPanel} component={LoginPage} />
                        <Route path={routes.registerPanel} component={RegisterPage} />
                        <MainWrapper>
                            <AuthGuard userRoles={[UserRole.Client, UserRole.Consultant]}>
                                <Route path={routes.reservations} component={ReservationsPage} />
                            </AuthGuard>
                            <AuthGuard userRoles={[UserRole.Client]}>
                                <Route path={routes.companyForm} component={CompaniesPage} />
                            </AuthGuard>
                        </MainWrapper>
                    </Switch>
                </AuthContextProvider>
            </Router>
        </ThemeProvider>
    </RootErrorBoundary>
);
