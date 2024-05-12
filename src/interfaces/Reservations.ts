import { BaseAppointment } from './Appointment';

interface Reservation {
  appointment: BaseAppointment;
  pricing: {
    parts: { name: string; amount: number }[];
    total: number;
  };
}

export default Reservation;
