import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';
import { ThemeProvider } from '@emotion/react';

import { theme } from 'settings/variables';
import { apiEndpoints } from 'settings/api';
import { mockApi, mockedApiClient } from 'common/mocks/httpClientMock';
import { ReservationsPage } from './ReservationsPage';
import { ReservationsContextProvider, ReservationsState } from './reservationsContext';

const reservationsMock = [
    {
        id: 1,
        name: 'Company 1',
        type: 'company',
        time_slots: [
            {
                start_time: '2018-07-09T08:00:00.000+02:00',
                end_time: '2018-07-09T09:30:00.000+02:00',
            },
            {
                start_time: '2018-07-09T08:30:00.000+02:00',
                end_time: '2018-07-09T10:00:00.000+02:00',
            },
            {
                start_time: '2018-07-09T09:00:00.000+02:00',
                end_time: '2018-07-09T10:30:00.000+02:00',
            },
        ],
    },
];

const renderContent = (contextValues?: ReservationsState) => {
    Modal.setAppElement(document.createElement('div'));

    return (
        <ReservationsContextProvider values={contextValues}>
            <ThemeProvider theme={theme}>
                <ReservationsPage />
            </ThemeProvider>
        </ReservationsContextProvider>
    );
};

const contextInitialStateMock: ReservationsState = {
    reservations: [
        {
            companyId: 1,
            timeSlot: {
                startDate: '2018-07-09T08:30:00.000+02:00',
                endDate: '2018-07-09T10:00:00.000+02:00',
            },
        },
    ],
    selectedCompanies: [],
};

beforeEach(() => {
    jest.restoreAllMocks();
    mockApi();
    mockedApiClient.get.mockImplementation(() => Promise.resolve({ data: reservationsMock }));
});

test('should fetch companies data and renders reservations page', async () => {
    const { getByTestId } = render(renderContent());

    await waitFor(() =>
        expect(mockedApiClient.get).toHaveBeenCalledWith(apiEndpoints.reservations),
    );

    expect(getByTestId('companyHeader-Company 1')).toHaveTextContent('Company 1');
    expect(getByTestId('timeSlotGroupHeader')).toHaveTextContent('Sunday (2018-07-01)');
    expect(getByTestId('timeSlotCard-2018-07-09T08:00:00.000+02:00')).toHaveTextContent(
        '08:00 - 09:30',
    );
    expect(getByTestId('timeSlotCard-2018-07-09T08:30:00.000+02:00')).toBeInTheDocument();
    expect(getByTestId('timeSlotCard-2018-07-09T09:00:00.000+02:00')).toBeInTheDocument();
});

test('should made reservation for company without reservation', async () => {
    const { getByText, getByTestId } = render(renderContent());

    await waitFor(() =>
        expect(mockedApiClient.get).toHaveBeenCalledWith(apiEndpoints.reservations),
    );

    act(() => {
        userEvent.click(getByText('08:00 - 09:30'));
    });

    expect(getByText('Reservation')).toBeInTheDocument();
    expect(getByTestId('reservationDay')).toHaveTextContent('Monday (2018-07-09)');
    expect(getByTestId('reservationTime')).toHaveTextContent('08:00-09:30');
});

test('should change reservation for company with reservation', async () => {
    const { getByText, getByTestId } = render(renderContent(contextInitialStateMock));

    await waitFor(() =>
        expect(mockedApiClient.get).toHaveBeenCalledWith(apiEndpoints.reservations),
    );

    act(() => {
        userEvent.click(getByText('09:00 - 10:30'));
    });

    expect(getByText('Reservation change confirmation')).toBeInTheDocument();

    act(() => {
        userEvent.click(getByTestId('modalConfirmButton'));
    });

    expect(getByText('Reservation')).toBeInTheDocument();
    expect(getByTestId('reservationDay')).toHaveTextContent('Monday (2018-07-09)');
    expect(getByTestId('reservationTime')).toHaveTextContent('09:00-10:30');
});

test('should open removal modal and remove previously made reservation', async () => {
    const { getByTestId, getByText } = render(renderContent(contextInitialStateMock));

    await waitFor(() =>
        expect(mockedApiClient.get).toHaveBeenCalledWith(apiEndpoints.reservations),
    );

    act(() => {
        userEvent.click(getByTestId('removeReservationButton'));
    });

    expect(getByText('Reservation removal confirmation')).toBeInTheDocument();

    act(() => {
        userEvent.click(getByTestId('modalConfirmButton'));
    });

    expect(getByText('No reservation')).toBeInTheDocument();
});
