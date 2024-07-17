import {DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR} from '../constants';
import ACTION_STRINGS from './actionStrings';
import {RequiredDocumentationActions} from './actionTypes';
import RequiredDocumentationState from './state';

const INITIAL_STATE: RequiredDocumentationState = {
  list: [],
  fetching: {
    fetch: {...DEFAULT_FETCHING_STATE},
    upload: {...DEFAULT_FETCHING_STATE},
    delete: {...DEFAULT_FETCHING_STATE},
    update: {...DEFAULT_FETCHING_STATE},
  },
  error: {...DEFAULT_NO_ERROR},
};

const reducer = (
  state = INITIAL_STATE,
  action: RequiredDocumentationActions,
): RequiredDocumentationState => {
  switch (action.type) {
    case ACTION_STRINGS.FETCH_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetch: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload,
        fetching: {
          ...state.fetching,
          fetch: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetch: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.NEW_DOC_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          upload: {
            config: {key: action.payload.uuid},
            isFetching: true,
          },
        },
      };
    case ACTION_STRINGS.NEW_DOC_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          upload: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.NEW_DOC_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          upload: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.UPDATE_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {
            config: {key: action.payload.uuid},
            isFetching: true,
          },
        },
      };
    case ACTION_STRINGS.UPDATE_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.UPDATE_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.DELETE_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          delete: {
            config: {key: action.payload},
            isFetching: true,
          },
        },
      };
    case ACTION_STRINGS.DELETE_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          delete: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.DELETE_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          delete: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.RESET_ERROR:
      return {...state, error: {...DEFAULT_NO_ERROR}};

    default:
      return state;
  }
};

export default reducer;
