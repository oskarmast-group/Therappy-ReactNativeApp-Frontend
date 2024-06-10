import Documentation from '../Documentation';
import { BaseInvitation } from '../Invitation';
import TimeAvailability from '../TimeAvailability';
import ClientTherapistStatus from './ClientTherapistStatus';
import TherapistStatus from './TherapistStatus';
import UserType from './UserType';

export interface BaseUser {
  id: number;
  name: string;
  lastName: string;
  profileImg: string | null;
}

export interface NestedBaseUser extends BaseUser {
  status: ClientTherapistStatus;
  invitationSent: 1 | 0;
}

export type NestedClient = NestedBaseUser;

export interface NestedTherapist extends NestedBaseUser {
  title: string;
  invitationAccepted: boolean;
  reviewAvg?: number | null;
  reviewsCount?: number;
}

export type NestedUser = NestedClient | NestedBaseUser;

export interface CompleteUser extends BaseUser {
  email: string;
  phoneNumber: string | null;
  phoneCountryCode: string | null;
  countryOrigin: string;
  userType: UserType;
  username: string;
  dob: string | null;
  emailVerified: 1 | 0;
}

export interface Client extends CompleteUser {
  userType: UserType.CLIENT;
  extraData: {
    id: number;
    active: 1 | 0;
    banned: 1 | 0;
    stripeClientId: string | null;
    therapist: NestedTherapist;
    invitations: BaseInvitation[];
  };
}

export interface Therapist extends CompleteUser {
  userType: UserType.THERAPIST;
  extraData: {
    id: number;
    title: string;
    experience: string;
    about: string;
    phrase: string;
    timeAvailability: TimeAvailability;
    stripeAccountId: string | null;
    status: TherapistStatus;
    paymentsReady: 1 | 0;
    clients: NestedClient[];
    invitations: BaseInvitation[];
    documentation: Documentation[];
  };
}

type User = Client | Therapist;

export default User;
