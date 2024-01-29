import AppointmentStatus from './AppointmentStatus';

export interface BaseAppointment {
  id: number;
  date: string;
  status: AppointmentStatus;
  roomId: string | null;
  name: string;
  lastName: string;
  profileImg: string | null;
  title?: string;
  therapistId?: number;
  clientId?: number;
}

interface Appointment extends BaseAppointment {
  userId: number;
  conversationId: string | null;
}

export default Appointment;
