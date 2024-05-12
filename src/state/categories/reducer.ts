import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from '../constants';
import ACTION_STRINGS from './actionStrings';
import { CategoryActions } from './actionTypes';
import CategoryState from './state';

const INITIAL_STATE: CategoryState = {
  list: [],
  fetching: { ...DEFAULT_FETCHING_STATE },
  error: { ...DEFAULT_NO_ERROR },
};

export default (state = INITIAL_STATE, action: CategoryActions): CategoryState => {
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

    case ACTION_STRINGS.RESET_ERROR:
      return { ...state, error: { ...DEFAULT_NO_ERROR } };

    default:
      return state;
  }
};
