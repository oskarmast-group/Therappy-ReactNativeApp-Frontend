import { format, add, sub } from 'date-fns';
import { es } from 'date-fns/locale';
import { dateFormat } from './date';

export const TIME_FORMAT_COMPLETE = 'kk:mm:ss';

export const TIME_FORMAT = 'kk:mm';

export const DISPLAY_TIME_FORMAT = 'h:mm a';

export const dateObjectFromTimeString = (time: string) => {
  return new Date(`${dateFormat(new Date())}T${time}`);
};

export const timeFormat = (date: string | number | Date, FORMAT = TIME_FORMAT) => {
  const dateFormatted = format(date ? new Date(date) : new Date(), FORMAT, {
    locale: es,
  });

  return dateFormatted;
};

export const getDisplayTime = (date: string | number | Date, FORMAT = DISPLAY_TIME_FORMAT) => {
  return timeFormat(new Date(date), FORMAT);
};

export const addHours = (time: string, hours: number) => {
  const dateObj = dateObjectFromTimeString(time);
  return add(dateObj, { hours });
};

export const substractHours = (time: string, hours: number) => {
  const dateObj = dateObjectFromTimeString(time);
  return sub(dateObj, { hours });
};

export const dayOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const daysInOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const timeStringFromHourInt = (hour: number) => `${hour < 13 ? hour : hour - 12}:00 ${hour < 13 ? 'AM' : 'PM'}`;
