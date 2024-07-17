import {Dispatch} from 'react';
import {
  NewDocStartPayload,
  RequiredDocumentationActions,
  UpdateStartPayload,
} from './actionTypes';
import {
  fetchStartAction,
  resetError,
  updateStartAction,
  newDocStartAction,
  deleteStartAction,
} from './actions';

export default class Dispatcher {
  _dispatch: Dispatch<RequiredDocumentationActions>;

  constructor(dispatch: Dispatch<RequiredDocumentationActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  newDocStart = (data: NewDocStartPayload) =>
    this._dispatch(newDocStartAction(data));

  deleteStart = (uuid: string) => this._dispatch(deleteStartAction(uuid));

  updateStart = (data: UpdateStartPayload) =>
    this._dispatch(updateStartAction(data));

  resetError = () => this._dispatch(resetError());
}
