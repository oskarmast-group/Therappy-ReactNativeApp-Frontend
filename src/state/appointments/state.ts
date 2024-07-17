import Appointment, {BaseAppointment} from '../../interfaces/Appointment';
import Reservation from '../../interfaces/Reservations';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface AppointmentState {
  list: BaseAppointment[];
  pendingList: BaseAppointment[];
  upcomingList: BaseAppointment[];
  reservation: Reservation | null;
  appointment: Appointment | null;
  serverTime: number | null;
  confirmed: boolean;
  fetching: FetchingState<null | {key: string}>;
  error: ErrorState;
}

export default AppointmentState;
