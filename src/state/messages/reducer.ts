import {DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR} from '../constants';
import ACTION_STRINGS from './actionStrings';
import {MessagesActions} from './actionTypes';
import MessagesState from './state';

const INITIAL_STATE: MessagesState = {
  list: [],
  markedAsRead: [],
  fetching: {
    fetch: {...DEFAULT_FETCHING_STATE},
    sendMessage: {...DEFAULT_FETCHING_STATE},
    markRead: {...DEFAULT_FETCHING_STATE},
  },
  extraMessagesToFetch: 0,
  error: {...DEFAULT_NO_ERROR},
};

const reducer = (
  state = INITIAL_STATE,
  action: MessagesActions,
): MessagesState => {
  switch (action.type) {
    // FETCH
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

    // SEND MESSAGE
    case ACTION_STRINGS.SEND_MESSAGE_START:
      return {
        ...state,
        list: [...state.list, action.payload],
        fetching: {
          ...state.fetching,
          sendMessage: {
            config: {uuid: action.payload.uuid},
            isFetching: true,
          },
        },
      };
    case ACTION_STRINGS.SEND_MESSAGE_SUCCESS: {
      const newList = [...state.list];
      const message = newList.find(msg => msg.uuid === action.payload.uuid);
      if (message) {
        const index = newList.indexOf(message);
        newList[index] = action.payload;
      }
      return {
        ...state,
        list: newList,
        fetching: {
          ...state.fetching,
          sendMessage: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    }
    case ACTION_STRINGS.SEND_MESSAGE_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          sendMessage: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // MARK AS READ
    case ACTION_STRINGS.MARK_AS_READ_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          markRead: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.MARK_AS_READ_SUCCESS:
      return {
        ...state,
        markedAsRead: [...state.markedAsRead, ...action.payload],
        fetching: {
          ...state.fetching,
          markRead: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.MARK_AS_READ_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          markRead: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // OTHER ACTIONS
    case ACTION_STRINGS.ADD_MESSAGE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case ACTION_STRINGS.CLEAR_CHAT:
      return {...state, list: []};

    case ACTION_STRINGS.SET_EXTRA_MESSAGES_TO_FETCH:
      return {
        ...state,
        extraMessagesToFetch: action.payload,
      };

    case ACTION_STRINGS.CLEAR_READ_LIST:
      return {...state, markedAsRead: [], error: {...DEFAULT_NO_ERROR}};

    case ACTION_STRINGS.RESET_ERROR:
      return {...state, error: {...DEFAULT_NO_ERROR}};

    default:
      return state;
  }
};

export default reducer;
