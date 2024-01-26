import FetchingState from './interfaces/FetchingState';
import ErrorState from './interfaces/ErrorState';

export const DEFAULT_FETCHING_STATE: FetchingState<{}> = {
  isFetching: false,
  config: {},
};

export const DEFAULT_NO_ERROR: ErrorState = {timestamp: 0, message: ''};
