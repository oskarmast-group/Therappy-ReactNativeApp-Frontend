import { Dispatch } from 'react';
import { TherapistActions } from './actionTypes';
import { fetchProfileStartAction, fetchStartAction, resetError } from './actions';
export default class Dispatcher {
  _dispatch: Dispatch<TherapistActions>;

  constructor(dispatch: Dispatch<TherapistActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  fetchProfileStart = (therapistId: number) => this._dispatch(fetchProfileStartAction(therapistId));

  resetError = () => this._dispatch(resetError());
}
