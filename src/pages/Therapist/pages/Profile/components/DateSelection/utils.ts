import { addDays, isAfter, isBefore, isEqual } from 'date-fns';
import TimeAvailability from '../../../../../../interfaces/TimeAvailability';
import { PublicAppointment } from '../../../../../../interfaces/Appointment';

export const checkDay = (timeAvailability: TimeAvailability, date: Date): boolean => {
  const hours = getHours(timeAvailability, date);
  return hours.length !== 0;
};

export const getHours = (timeAvailability: TimeAvailability, date: Date): Date[] => {
  const day = new Date(date);
  const nextDay = addDays(day, 1);

  const hours: Date[] = [];

  for (const value of Object.values(timeAvailability).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())) {
    const time = new Date(value);
    if (isAfter(time, day) && isBefore(time, nextDay)) {
      hours.push(time);
    }
  }
  return hours;
};

export const isAvailable = (hour: Date, appointments: PublicAppointment[]): boolean => {
  if (!appointments || appointments.length === 0) {
    return true;
  }
  for (const app of appointments) {
    const appDate = new Date(app.date);
    const date = new Date(hour);
    if (isEqual(date, appDate)) {
      return false;
    }
  }
  return true;
};
