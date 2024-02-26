import Message from '../../interfaces/Conversation/Message';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: Message[];
};

export type FetchError = {
  type: ACTION_STRINGS.FETCH_ERROR;
  payload: any;
};

export type SendMessageStart = {
  type: ACTION_STRINGS.SEND_MESSAGE_START;
  payload: Message;
};

export type SendMessageSuccess = {
  type: ACTION_STRINGS.SEND_MESSAGE_SUCCESS;
  payload: Message;
};

export type SendMessageError = {
  type: ACTION_STRINGS.SEND_MESSAGE_ERROR;
  payload: any;
};

export type MarkAsReadStart = {
  type: ACTION_STRINGS.MARK_AS_READ_START;
  payload: null;
};

export type MarkAsReadSuccess = {
  type: ACTION_STRINGS.MARK_AS_READ_SUCCESS;
  payload: string[];
};

export type MarkAsReadError = {
  type: ACTION_STRINGS.MARK_AS_READ_ERROR;
  payload: any;
};

export type AddMessage = {
  type: ACTION_STRINGS.ADD_MESSAGE;
  payload: Message;
};

export type ClearChat = {
  type: ACTION_STRINGS.CLEAR_CHAT;
  payload: null;
};

export type SetExtraMessagesToFetch = {
  type: ACTION_STRINGS.SET_EXTRA_MESSAGES_TO_FETCH;
  payload: number;
};

export type ClearReadList = {
  type: ACTION_STRINGS.CLEAR_READ_LIST;
  payload: null;
};

export type MessagesActions =
  | FetchError
  | FetchStart
  | FetchSuccess
  | SendMessageError
  | SendMessageStart
  | SendMessageSuccess
  | MarkAsReadError
  | MarkAsReadStart
  | MarkAsReadSuccess
  | AddMessage
  | ClearChat
  | SetExtraMessagesToFetch
  | ClearReadList
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
