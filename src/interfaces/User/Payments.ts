import CARD_BRANDS from '../../resources/constants/cardBrands';
import {tranlateDay} from '../../utils/text';

export interface PaymentSheet {
  customerId: string;
  ephemeralKey: {
    id: string;
    object: string;
    associated_objects: {
      id: string;
      type: string;
    }[];
    created: number;
    expires: number;
    livemode: boolean;
    secret: string;
  };
  setupIntentSecret: string;
}

export interface AccountInformationPayoutsSchedule {
  delay_days: number;
  interval: string;
  weekly_anchor?: keyof typeof tranlateDay;
  monthly_anchor?: number;
}

export interface AccountInformationBalance {
  object: string;
  available: {
    amount: number;
    currency: string;
    source_types: {
      card: number;
    };
  }[];
  livemode: boolean;
  pending: {
    amount: number;
    currency: string;
    source_types: {
      card: number;
    };
  }[];
}
export interface AccountInformation {
  id: string;
  details_submitted: boolean;
  requirements: {
    alternatives: any[];
    current_deadline: null;
    currently_due: any[];
    disabled_reason: null;
    errors: any[];
    eventually_due: any[];
    past_due: any[];
    pending_verification: any[];
  };
  settings: {
    bacs_debit_payments: {
      display_name: null;
      service_user_number: null;
    };
    branding: {
      icon: null;
      logo: null;
      primary_color: null;
      secondary_color: null;
    };
    card_issuing: {
      tos_acceptance: {
        date: null;
        ip: null;
      };
    };
    card_payments: {
      decline_on: {
        avs_failure: boolean;
        cvc_failure: boolean;
      };
      statement_descriptor_prefix: null;
      statement_descriptor_prefix_kana: null;
      statement_descriptor_prefix_kanji: null;
    };
    dashboard: {
      display_name: string;
      timezone: string;
    };
    invoices: {
      default_account_tax_ids: null;
    };
    payments: {
      statement_descriptor: string;
      statement_descriptor_kana: null;
      statement_descriptor_kanji: null;
    };
    payouts: {
      debit_negative_balances: boolean;
      schedule: AccountInformationPayoutsSchedule;
      statement_descriptor: null;
    };
    sepa_debit_payments: {};
  };
  balance: AccountInformationBalance;
}

export interface AccountLink {
  object: string;
  created: number;
  expires_at: number;
  url: string;
}
interface PaymentMethod {
  id: string;
  object: string;
  allow_redisplay: string;
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string;
      state: string | null;
    };
    email: string | null;
    name: string;
    phone: string | null;
  };
  card: {
    brand: CARD_BRANDS;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string;
      cvc_check: string;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: string | null;
  };
  created: number;
  customer: string;
  livemode: boolean;
  metadata: {[key: string]: any};
  type: string;
}

export default PaymentMethod;
