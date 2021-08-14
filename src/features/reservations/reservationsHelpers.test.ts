import {
    checkIfDatesAreOverlapping,
    getSlotState,
    transformCompanyToOption,
} from './reservationsHelpers';
import { SlotState } from './reservationsTypings';

test('should return true for overlapping timeSlots', () => {
    const isOverlapping = checkIfDatesAreOverlapping(
        {
            startDate: '2018-07-09T08:00:00.000+02:00',
            endDate: '2018-07-09T09:30:00.000+02:00',
        },
        {
            startDate: '2018-07-09T08:30:00.000+02:00',
            endDate: '2018-07-09T10:00:00.000+02:00',
        },
    );

    expect(isOverlapping).toBe(true);
});

test('should return false for not overlapping timeSlots', () => {
    const isOverlapping = checkIfDatesAreOverlapping(
        {
            startDate: '2018-07-09T08:00:00.000+02:00',
            endDate: '2018-07-09T09:30:00.000+02:00',
        },
        {
            startDate: '2018-07-10T08:00:00.000+02:00',
            endDate: '2018-07-10T09:30:00.000+02:00',
        },
    );

    expect(isOverlapping).toBe(false);
});

test('should transform company to option properly', () => {
    const selectOption = transformCompanyToOption({
        id: 1,
        name: 'Company 1',
        type: 'company',
        days: {},
    });

    expect(selectOption).toMatchObject({
        label: 'Company 1',
        value: 1,
    });
});

test('should return that slot is free when there is no reservations', () => {
    const slotState = getSlotState(
        {
            startDate: '2018-07-09T08:00:00.000+02:00',
            endDate: '2018-07-09T09:30:00.000+02:00',
        },
        [],
        1,
    );

    expect(slotState).toBe(SlotState.Free);
});

test('should return that slot is reserved when there is reservation for this slot by the same company', () => {
    const slotState = getSlotState(
        {
            startDate: '2018-07-09T08:00:00.000+02:00',
            endDate: '2018-07-09T09:30:00.000+02:00',
        },
        [
            {
                companyId: 1,
                timeSlot: {
                    startDate: '2018-07-09T08:00:00.000+02:00',
                    endDate: '2018-07-09T09:30:00.000+02:00',
                },
            },
        ],
        1,
    );

    expect(slotState).toBe(SlotState.Reserved);
});

test('should return that slot is disabled when there is reservation for this slot by the other company', () => {
    const slotState = getSlotState(
        {
            startDate: '2018-07-09T08:00:00.000+02:00',
            endDate: '2018-07-09T09:30:00.000+02:00',
        },
        [
            {
                companyId: 2,
                timeSlot: {
                    startDate: '2018-07-09T08:00:00.000+02:00',
                    endDate: '2018-07-09T09:30:00.000+02:00',
                },
            },
        ],
        1,
    );

    expect(slotState).toBe(SlotState.Disabled);
});
