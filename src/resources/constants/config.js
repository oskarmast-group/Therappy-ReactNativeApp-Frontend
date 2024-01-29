export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export const MAX_APPOINTMENT_CANCELLATION_TIME =
  +process.env.REACT_APP_MAX_APPOINTMENT_CANCELLATION_TIME;

export const TherapistStatus = {
  REGISTERED: 'registered',
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const TherapistApprovalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const PUBLIC_VAPID_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;
