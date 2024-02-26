import Message from '../../interfaces/Conversation/Message';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  AddMessage,
  ClearChat,
  ClearReadList,
  FetchError,
  FetchStart,
  FetchSuccess,
  MarkAsReadError,
  MarkAsReadStart,
  MarkAsReadSuccess,
  SendMessageError,
  SendMessageStart,
  SendMessageSuccess,
  SetExtraMessagesToFetch,
} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: Message[]): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const sendMessageStartAction = (payload: Message): SendMessageStart => ({
  type: ACTION_STRINGS.SEND_MESSAGE_START,
  payload,
});

export const sendMessageSuccessAction = (
  payload: Message,
): SendMessageSuccess => ({
  type: ACTION_STRINGS.SEND_MESSAGE_SUCCESS,
  payload,
});

export const sendMessageErrorAction = (payload: any): SendMessageError => ({
  type: ACTION_STRINGS.SEND_MESSAGE_ERROR,
  payload,
});

export const markAsReadStartAction = (): MarkAsReadStart => ({
  type: ACTION_STRINGS.MARK_AS_READ_START,
  payload: null,
});

export const markAsReadSuccessAction = (
  payload: string[],
): MarkAsReadSuccess => ({
  type: ACTION_STRINGS.MARK_AS_READ_SUCCESS,
  payload,
});

export const markAsReadErrorAction = (payload: any): MarkAsReadError => ({
  type: ACTION_STRINGS.MARK_AS_READ_ERROR,
  payload,
});

export const addMessageAction = (payload: Message): AddMessage => ({
  type: ACTION_STRINGS.ADD_MESSAGE,
  payload,
});

export const clearChatAction = (): ClearChat => ({
  type: ACTION_STRINGS.CLEAR_CHAT,
  payload: null,
});

export const setExtraMessagesToFetchAction = (
  payload: number,
): SetExtraMessagesToFetch => ({
  type: ACTION_STRINGS.SET_EXTRA_MESSAGES_TO_FETCH,
  payload,
});

export const clearReadListAction = (): ClearReadList => ({
  type: ACTION_STRINGS.CLEAR_READ_LIST,
  payload: null,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
