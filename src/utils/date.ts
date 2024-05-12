import { format, subDays, add, isAfter } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalize } from './text';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_DATE_FORMAT = 'd / MMMM / yyyy';

export const dateFormat = (date?: string | number | Date, FORMAT = DATE_FORMAT) => {
  const dateFormatted = format(date ? new Date(date) : new Date(), FORMAT, {
    locale: es,
  });

  return dateFormatted;
};

export const getDisplayDate = (date: string | number | Date, FORMAT = DISPLAY_DATE_FORMAT) => {
  const dateFormatted = dateFormat(new Date(date), FORMAT);

  return capitalize(dateFormatted);
};

export const addDays = (date: string | number | Date, days: number) => {
  const dateObj = new Date(date);
  return add(dateObj, { days });
};

export const removeDays = (date: string | number | Date, days: number) => {
  const dateObj = new Date(date);
  return subDays(dateObj, days);
};

export const isDateAfter = (date: string | number | Date, dateToCompare: string | number | Date) => {
  return isAfter(new Date(date), new Date(dateToCompare));
};
