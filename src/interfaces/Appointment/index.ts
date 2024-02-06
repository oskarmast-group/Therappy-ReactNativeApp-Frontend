import AppointmentStatus from './AppointmentStatus';

export interface PublicAppointment {
  id: number;
  date: string;
  therapistId: number;
}

export interface BaseAppointment extends PublicAppointment {
  status: AppointmentStatus;
  roomId: string | null;
  name: string;
  lastName: string;
  profileImg: string | null;
  title?: string;
  clientId?: number;
}

interface Appointment extends BaseAppointment {
  userId: number;
  conversationId: string | null;
}

export default Appointment;
