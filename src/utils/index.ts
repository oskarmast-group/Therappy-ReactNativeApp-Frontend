import { BaseAppointment } from '../interfaces/Appointment';
import AppointmentStatus from '../interfaces/Appointment/AppointmentStatus';
import File from '../interfaces/File';
import { DARKER_TEXT, GOLDEN, PRIMARY_GREEN, RED } from '../resources/constants/colors';

export const toFormData = (object: { [key: string]: any }) => {
  const formdata = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    if (value) {
      value = typeof value === 'object' && !(value instanceof File) ? JSON.stringify(value) : value;
      formdata.append(key, value);
    }
  });

  return formdata;
};

export const compareStrings = (a: string, b: string) => a.trim().toLowerCase().includes(b.trim().toLowerCase());

export const getStatusColor = ({ status }: BaseAppointment) => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return GOLDEN;
    case AppointmentStatus.ACCEPTED:
      return PRIMARY_GREEN;
    case AppointmentStatus.REJECTED:
    case AppointmentStatus.CANCELLED:
      return RED;
    default:
      return DARKER_TEXT;
  }
};
