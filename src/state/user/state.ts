import User from '../../interfaces/User';
import PaymentMethod, {
  AccountInformation,
} from '../../interfaces/User/Payments';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface UserState {
  current: User | null;
  setupIntentToken: string | null;
  paymentMethods: PaymentMethod[];
  accountInformation: AccountInformation | null;
  fetching: {
    fetch: FetchingState<null>;
    update: FetchingState<null | {key: string}>;
    setup: FetchingState<null>;
    deletePaymentMethod: FetchingState<null>;
    paymentMethods: FetchingState<null>;
    acceptInvitation: FetchingState<null>;
    accountInformation: FetchingState<null>;
  };
  error: ErrorState;
}

export default UserState;
