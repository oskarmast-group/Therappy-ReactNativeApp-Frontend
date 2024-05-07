import { DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR } from '../constants';
import ConversationState from './state';
import { ConversationActions } from './actionTypes';
import ACTION_STRINGS from './actionStrings';

const INITIAL_STATE: ConversationState = {
  list: [],
  conversation: null,
  fetching: {
    fetch: { ...DEFAULT_FETCHING_STATE },
    fetchOne: { ...DEFAULT_FETCHING_STATE },
  },
  error: { ...DEFAULT_NO_ERROR },
};

const reducer = (state = INITIAL_STATE, action: ConversationActions): ConversationState => {
  switch (action.type) {
    // FETCH
    case ACTION_STRINGS.FETCH_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetch: { ...DEFAULT_FETCHING_STATE, isFetching: true },
        },
      };
    case ACTION_STRINGS.FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload,
        fetching: {
          ...state.fetching,
          fetch: { ...DEFAULT_FETCHING_STATE },
        },
        error: { ...DEFAULT_NO_ERROR },
      };
    case ACTION_STRINGS.FETCH_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetch: { ...DEFAULT_FETCHING_STATE },
        },
        error: { timestamp: Date.now(), message: action.payload },
      };

    // FETCH ONE
    case ACTION_STRINGS.FETCH_ONE_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetchOne: { ...DEFAULT_FETCHING_STATE, isFetching: true },
        },
      };
    case ACTION_STRINGS.FETCH_ONE_SUCCESS:
      return {
        ...state,
        conversation: action.payload,
        fetching: {
          ...state.fetching,
          fetchOne: { ...DEFAULT_FETCHING_STATE },
        },
        error: { ...DEFAULT_NO_ERROR },
      };
    case ACTION_STRINGS.FETCH_ONE_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetchOne: { ...DEFAULT_FETCHING_STATE },
        },
        error: { timestamp: Date.now(), message: action.payload },
      };

    case ACTION_STRINGS.CLEAR_CONVERSATION:
      return { ...state, conversation: null, error: { ...DEFAULT_NO_ERROR } };

    case ACTION_STRINGS.ADD_LAST_MESSAGE: {
      const list = state.list;

      const conversation = list.find(({ uuid }) => uuid === action.payload.conversationUUID);

      if (!conversation) {
        return state;
      }

      const index = list.indexOf(conversation);
      if (index < 0) {
        return state;
      }

      list[index] = {
        ...conversation,
        lastMessage: action.payload,
        unreadMessagesCount: (conversation.unreadMessagesCount ?? 0) + 1,
      };

      return { ...state, list: [...list], error: { ...DEFAULT_NO_ERROR } };
    }

    case ACTION_STRINGS.RESET_ERROR:
      return { ...state, error: { ...DEFAULT_NO_ERROR } };

    default:
      return state;
  }
};

export default reducer;
