import {Dispatch} from 'react';
import {ConversationActions} from './actionTypes';
import {
  addLastMessageAction,
  clearConversationAction,
  fetchOneStartAction,
  fetchStartAction,
  resetError,
} from './actions';
import {SocketMessage} from '../../interfaces/Conversation/Message';

export default class Dispatcher {
  _dispatch: Dispatch<ConversationActions>;

  constructor(dispatch: Dispatch<ConversationActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  fetchOneStart = (uuid: string) => this._dispatch(fetchOneStartAction(uuid));

  clearConversation = () => this._dispatch(clearConversationAction());

  addLastMessage = (payload: SocketMessage) =>
    this._dispatch(addLastMessageAction(payload));

  resetError = () => this._dispatch(resetError());
}
