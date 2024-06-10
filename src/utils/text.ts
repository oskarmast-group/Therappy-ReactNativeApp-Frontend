import { BaseAppointment } from '../interfaces/Appointment';
import AppointmentStatus from '../interfaces/Appointment/AppointmentStatus';
// import {daysInOrder} from './time';

export const getStatusText = ({ status }: BaseAppointment) => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'Solicitada';
    case AppointmentStatus.ACCEPTED:
      return 'Aceptada';
    case AppointmentStatus.REJECTED:
      return 'Rechazada';
    case AppointmentStatus.COMPLETED:
      return 'Finalizada';
    case AppointmentStatus.CANCELLED:
      return 'Cancelada';
    default:
      return '';
  }
};

export const tranlateDay = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export const dayOfTheWeekTranslated = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const dayOfTheWeekTranslatedAbr = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

// export const timeAvailabilityToString = ({hours}) => {
//   const days = [];
//   for (const day of daysInOrder) {
//     const hour = hours[day];
//     if (hour !== null) days.push(tranlateDay[day]);
//   }

//   const last = days.pop();

//   return {days: days.length > 0 ? `${days.join(', ')} y ${last}` : last};
// };

export const capitalize = (string: string) =>
  string
    .split(' ')
    .map((item) => item.charAt(0).toLocaleUpperCase() + item.slice(1))
    .join(' ');

export const formatMoney = (
  amount: number,
  decimalCount: number = 2,
  decimal: string = '.',
  thousands: string = ',',
  currencySymbol: string = '$',
): string => {
  try {
    const negativeSign = amount < 0 ? '-' : '';
    const amountRounded = Math.floor(Math.abs(amount));
    const amountDecimal = ((Math.abs(amount) % 1) * Math.pow(10, decimalCount)).toFixed(0);

    const amountLength = amountRounded.toString().length;
    const thousandPartsCount = Math.floor((amountLength - 1) / 3);
    const thousandsPartsModulus = amountLength % 3;

    const parts = [];
    for (let i = 0; i < thousandPartsCount; i++) {
      parts.unshift(amountRounded.toString().substring(amountLength - (i + 1) * 3, amountLength - i * 3));
    }
    if (thousandsPartsModulus !== 0) {
      parts.unshift(amountRounded.toString().substring(0, thousandsPartsModulus));
    }
    return (
      negativeSign +
      currencySymbol +
      (parts.length === 0 ? amountRounded : parts.join(thousands)) +
      decimal +
      amountDecimal.padStart(decimalCount, '0')
    );
  } catch (e) {
    console.error(e);
    return ''; // Return an empty string or a suitable error message
  }
};
