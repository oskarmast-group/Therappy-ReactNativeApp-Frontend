export const STRIPE_PUBLIC_KEY =
  'pk_test_51Lin4dJREH8MbuesItfrJuFs5JeoOYCOObRNR69IdDtnLLeG31zLPZ71cmjF1P1rYz8793SeSjApeOI6JrSC3m0J00ltzlUsug';

export const MAX_APPOINTMENT_CANCELLATION_TIME = +24;

export const ClientTherapistStatus = {
  ACTIVE: 'active',
  DISMISSED: 'dismissed',
  PENDING: 'pending',
};

export const AppointmentStatusValues = {
  RESERVED: 'reserved',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
};

export const UserTypes = {
  THERAPIST: 'therapist',
  CLIENT: 'client',
  ADMIN: 'admin',
  MANAGER: 'manager',
};

export const TherapistStatus = {
  REGISTERED: 'registered',
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const DocumentationStatus = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
};
export const PUBLIC_VAPID_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;
