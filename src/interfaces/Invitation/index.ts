import ClientTherapistStatus from '../User/ClientTherapistStatus';

export interface BaseInvitation {
  userId: number;
  invitationUUID: string;
  accepted: boolean;
  status: ClientTherapistStatus;
}
