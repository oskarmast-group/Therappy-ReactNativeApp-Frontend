import {Dispatch} from 'react';
import {MessagesActions} from './actionTypes';
import {
  addMessageAction,
  clearChatAction,
  clearReadListAction,
  fetchStartAction,
  markAsReadStartAction,
  resetError,
  sendMessageStartAction,
  setExtraMessagesToFetchAction,
} from './actions';
import Message from '../../interfaces/Conversation/Message';

export default class Dispatcher {
  _dispatch: Dispatch<MessagesActions>;

  constructor(dispatch: Dispatch<MessagesActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  sendMessageStart = (payload: Message) =>
    this._dispatch(sendMessageStartAction(payload));

  markAsReadStart = () => this._dispatch(markAsReadStartAction());

  addMessage = (payload: Message) => this._dispatch(addMessageAction(payload));

  clearChat = () => this._dispatch(clearChatAction());

  setExtraMessagesToFetch = (payload: number) =>
    this._dispatch(setExtraMessagesToFetchAction(payload));

  clearReadList = () => this._dispatch(clearReadListAction());

  resetError = () => this._dispatch(resetError());
}
