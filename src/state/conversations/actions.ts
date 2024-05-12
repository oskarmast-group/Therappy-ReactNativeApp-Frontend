import Conversation, { BaseConversation } from '../../interfaces/Conversation';
import { SocketMessage } from '../../interfaces/Conversation/Message';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  AddLastMessage,
  ClearConversation,
  FetchError,
  FetchOneError,
  FetchOneStart,
  FetchOneSuccess,
  FetchStart,
  FetchSuccess,
} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: Conversation[]): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const fetchOneStartAction = (payload: string): FetchOneStart => ({
  type: ACTION_STRINGS.FETCH_ONE_START,
  payload,
});

export const fetchOneSuccessAction = (payload: BaseConversation): FetchOneSuccess => ({
  type: ACTION_STRINGS.FETCH_ONE_SUCCESS,
  payload,
});

export const fetchOneErrorAction = (payload: any): FetchOneError => ({
  type: ACTION_STRINGS.FETCH_ONE_ERROR,
  payload,
});

export const clearConversationAction = (): ClearConversation => ({
  type: ACTION_STRINGS.CLEAR_CONVERSATION,
  payload: null,
});

export const addLastMessageAction = (payload: SocketMessage): AddLastMessage => ({
  type: ACTION_STRINGS.ADD_LAST_MESSAGE,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
