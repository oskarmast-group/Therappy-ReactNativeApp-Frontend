import FetchingState from './interfaces/FetchingState';
import ErrorState from './interfaces/ErrorState';

export const DEFAULT_FETCHING_STATE: FetchingState<null> = {
  isFetching: false,
  config: null,
};

export const DEFAULT_NO_ERROR: ErrorState = { timestamp: 0, message: '' };
