import styled from '@emotion/styled';

export const ReservationsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 1rem;
`;

export const LoaderWrapper = styled.div`
    margin: auto;
`;

export const DrawerWrapper = styled.div`
    padding: 1rem;
`;

export const BigCalendarWrapper = styled.div`
    .fc-media-screen {
        height: calc(100vh - 8rem);
        overflow: scroll;
    }
    .fc-toolbar-chunk {
        display: none;
    }

    .fc-day-disabled {
        display: none;
    }
    .fc .fc-toolbar.fc-header-toolbar {
        display: none;
    }
    .fc-day-sat {
        background-color: #e48989;
    }
`;
