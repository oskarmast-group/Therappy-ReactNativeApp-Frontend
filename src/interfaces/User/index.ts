import Documentation from "../Documentation";
import { BaseInvitation } from "../Invitation";
import TimeAvailability from "../TimeAvailability";
import ClientTherapistStatus from "./ClientTherapistStatus";
import TherapistStatus from "./TherapistStatus";
import UserType from "./UserType";

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

export interface IPaymentMethod {
  id: string;
  object: string;
  allow_redisplay: string;
  billing_details: {
    address: {
      city: null;
      country: null;
      line1: null;
      line2: null;
      postal_code: string;
      state: null;
    };
    email: null;
    name: string;
    phone: null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: null | string;
      address_postal_code_check: string;
      cvc_check: string;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: null | string;
    last4: string;
    networks: {
      available: Array<string>;
      preferred: null | string;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: null;
  };
  created: Date;
  customer: string;
  livemode: boolean;
  metadata: {
    name: string;
  };
  type: string;
}

export interface AccountInformation {
  id: number;
  details_submitted: boolean;
  requirements: object;
  settings: {
    payouts: {
      schedule: {
        interval: string;
        weekly_anchor: string | number;
        monthly_anchor: string | number;
        delay_days: number;
      };
    };
  };
  balance: {
    available: [
      {
        amount: number;
        currency: string;
        source_types: {
          card: number;
        };
      }
    ];
  };
}
export interface SetupIntentToken {
  secret: string;
}

export default User;
