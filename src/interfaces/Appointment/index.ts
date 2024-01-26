import AppointmentStatus from './AppointmentStatus';

export interface BaseAppointment {
  id: number;
  date: string;
  status: AppointmentStatus;
  name: string;
  lastName: string;
  profileImg: string | null;
  title?: string;
  therapistId?: number;
  clientId?: number;
}

interface Appointment extends BaseAppointment {
  roomId: string | null;
  userId: number;
  conversationId: string | null;
}

export default Appointment;
