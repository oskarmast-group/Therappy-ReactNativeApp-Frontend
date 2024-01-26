import User from '../../interfaces/User';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface UserState {
  current: User | null;
  setupIntentToken: string | null;
  paymentMethods: [];
  accountInformation: {};
  fetching: {
    fetch: FetchingState<{}>;
    update: FetchingState<{}>;
    setup: FetchingState<{}>;
    deletePaymentMethod: FetchingState<{}>;
    paymentMethods: FetchingState<{}>;
    acceptInvitation: FetchingState<{}>;
    accountInformation: FetchingState<{}>;
  };
  error: ErrorState;
}

export default UserState;
