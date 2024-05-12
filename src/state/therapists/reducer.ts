import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from '../constants';
import TherapistState from './state';
import { TherapistActions } from './actionTypes';
import ACTION_STRINGS from './actionStrings';

const INITIAL_STATE: TherapistState = {
  list: [],
  current: null,
  fetching: { ...DEFAULT_FETCHING_STATE },
  error: { ...DEFAULT_NO_ERROR },
};

const reducer = (state = INITIAL_STATE, action: TherapistActions): TherapistState => {
  switch (action.type) {
    case ACTION_STRINGS.FETCH_START:
      return {
        ...state,
        fetching: { ...DEFAULT_FETCHING_STATE, isFetching: true },
      };
    case ACTION_STRINGS.FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload,
        fetching: { ...DEFAULT_FETCHING_STATE },
        error: { ...DEFAULT_NO_ERROR },
      };
    case ACTION_STRINGS.FETCH_ERROR:
      return {
        ...state,
        fetching: { ...DEFAULT_FETCHING_STATE },
        error: { timestamp: Date.now(), message: action.payload },
      };

    case ACTION_STRINGS.FETCH_PROFILE_START:
      return {
        ...state,
        fetching: { ...DEFAULT_FETCHING_STATE, isFetching: true },
      };
    case ACTION_STRINGS.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        current: action.payload,
        fetching: { ...DEFAULT_FETCHING_STATE },
        error: { ...DEFAULT_NO_ERROR },
      };
    case ACTION_STRINGS.FETCH_PROFILE_ERROR:
      return {
        ...state,
        fetching: { ...DEFAULT_FETCHING_STATE },
        error: { timestamp: Date.now(), message: action.payload },
      };

    case ACTION_STRINGS.RESET_ERROR:
      return { ...state, error: { ...DEFAULT_NO_ERROR } };

    default:
      return state;
  }
};

export default reducer;
