import ACTION_STRINGS from './actionStrings';
import AppointmentState from './state';
import {DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR} from '../constants';
import {AppointmentActions} from './actionTypes';

const INITIAL_STATE: AppointmentState = {
  list: [],
  pendingList: [],
  upcomingList: [],
  reservation: null,
  appointment: null,
  serverTime: null,
  fetching: {...DEFAULT_FETCHING_STATE},
  confirmed: false,
  error: {...DEFAULT_NO_ERROR},
};

const reducer = (
  state = INITIAL_STATE,
  action: AppointmentActions,
): AppointmentState => {
  switch (action.type) {
    case ACTION_STRINGS.FETCH_UPCOMING_START:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE, isFetching: true},
      };
    case ACTION_STRINGS.FETCH_UPCOMING_SUCCESS:
      return {
        ...state,
        upcomingList: action.payload,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_UPCOMING_ERROR:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {timestamp: Date.now(), message: action.payload},
      };

    // case Types.FETCH_START:
    // case Types.RESERVE_START:
    //   return {...state, fetching: {...DEFAULT_FETCHING_STATE, state: true}};
    // case Types.FETCH_SUCCESS:
    //   return {
    //     ...state,
    //     list: action.payload,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.FETCH_ERROR:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // case Types.RESERVE_SUCCESS:
    //   return {
    //     ...state,
    //     reservation: action.payload,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.RESERVE_ERROR:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // case Types.CONFIRM_START:
    //   return {...state, fetching: {config: {key: 'confirm'}, state: true}};
    // case Types.CONFIRM_SUCCESS:
    //   return {
    //     ...state,
    //     confirmed: true,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.CONFIRM_ERROR:
    //   return {
    //     ...state,
    //     confirmed: false,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    case ACTION_STRINGS.ACCEPT_START:
      return {...state, fetching: {config: {key: 'accept'}, isFetching: true}};
    case ACTION_STRINGS.ACCEPT_SUCCESS:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.ACCEPT_ERROR:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.FETCH_PENDING_START:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE, isFetching: true},
      };
    case ACTION_STRINGS.FETCH_PENDING_SUCCESS:
      return {
        ...state,
        pendingList: action.payload,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_PENDING_ERROR:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.FETCH_ONE_START:
      return {
        ...state,
        fetching: {config: {key: 'fetchOne'}, isFetching: true},
      };
    case ACTION_STRINGS.FETCH_ONE_SUCCESS:
      return {
        ...state,
        appointment: action.payload,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_ONE_ERROR:
      return {
        ...state,
        fetching: {...DEFAULT_FETCHING_STATE},
        error: {timestamp: Date.now(), message: action.payload},
      };

    // case Types.GET_SERVER_TIME_START:
    //   return {...state, fetching: {config: {key: 'serverTime'}, state: true}};
    // case Types.GET_SERVER_TIME_SUCCESS:
    //   return {
    //     ...state,
    //     serverTime: action.payload,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.GET_SERVER_TIME_ERROR:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // case Types.CANCEL_START:
    //   return {...state, fetching: {config: {key: 'cancel'}, state: true}};
    // case Types.CANCEL_SUCCESS:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.CANCEL_ERROR:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // case Types.REJECT_START:
    //   return {...state, fetching: {config: {key: 'reject'}, state: true}};
    // case Types.REJECT_SUCCESS:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.REJECT_ERROR:
    //   return {
    //     ...state,
    //     fetching: {...DEFAULT_FETCHING_STATE},
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // case Types.CLEAR_CURRENT:
    //   return {...state, appointment: {}};

    // case Types.RESET_ERROR:
    //   return {...state, error: {...DEFAULT_NO_ERROR}};

    default:
      return state;
  }
};
export default reducer;
