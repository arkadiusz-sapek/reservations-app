import { format } from 'date-fns';
import { DATE_FORMAT, DAY_OF_WEEK_FORMAT, FULL_DATE_FORMAT, TIME_FORMAT } from 'settings/variables';

export const formatDate = (formatToUse: string) => (date: string) =>
    format(new Date(date), formatToUse);

export const getTime = formatDate(TIME_FORMAT);
export const getDate = formatDate(DATE_FORMAT);
export const getFullDate = formatDate(FULL_DATE_FORMAT);
export const getDayOfWeek = formatDate(DAY_OF_WEEK_FORMAT);
