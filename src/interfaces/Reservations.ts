import {BaseAppointment} from './Appointment';

export interface Pricing {
  parts: {name: string; amount: number}[];
  total: number;
}
interface Reservation {
  appointment: BaseAppointment;
  pricing: Pricing;
}

export default Reservation;
