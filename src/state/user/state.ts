import User from '../../interfaces/User';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

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

interface UserState {
  current: User | null;
  setupIntentToken: string | null;
  paymentMethods: Array<IPaymentMethod>;
  accountInformation: {
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
        },
      ];
    };
  };
  fetching: {
    fetch: FetchingState<null>;
    update: FetchingState<null | { key: string }>;
    setup: FetchingState<null>;
    deletePaymentMethod: FetchingState<null>;
    paymentMethods: FetchingState<null>;
    acceptInvitation: FetchingState<null>;
    accountInformation: FetchingState<null>;
  };
  error: ErrorState;
}

export default UserState;
