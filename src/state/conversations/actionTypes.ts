import Conversation, {BaseConversation} from '../../interfaces/Conversation';
import {SocketMessage} from '../../interfaces/Conversation/Message';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: Conversation[];
};

export type FetchError = {
  type: ACTION_STRINGS.FETCH_ERROR;
  payload: any;
};

export type FetchOneStart = {
  type: ACTION_STRINGS.FETCH_ONE_START;
  payload: string;
};

export type FetchOneSuccess = {
  type: ACTION_STRINGS.FETCH_ONE_SUCCESS;
  payload: BaseConversation;
};

export type FetchOneError = {
  type: ACTION_STRINGS.FETCH_ONE_ERROR;
  payload: any;
};

export type ClearConversation = {
  type: ACTION_STRINGS.CLEAR_CONVERSATION;
  payload: null;
};

export type AddLastMessage = {
  type: ACTION_STRINGS.ADD_LAST_MESSAGE;
  payload: SocketMessage;
};

export type ConversationActions =
  | FetchError
  | FetchStart
  | FetchSuccess
  | FetchOneError
  | FetchOneStart
  | FetchOneSuccess
  | ClearConversation
  | AddLastMessage
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
