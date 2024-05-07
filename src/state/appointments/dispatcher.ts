import { Dispatch } from 'react';
import { AppointmentActions } from './actionTypes';
import {
  acceptStartAction,
  cancelStartAction,
  clearCurrentAction,
  fetchOneStartAction,
  fetchPendingStartAction,
  fetchStartAction,
  fetchUpcomingStartAction,
  getServerTimeStartAction,
  rejectStartAction,
  resetError,
} from './actions';

export default class Dispatcher {
  _dispatch: Dispatch<AppointmentActions>;

  constructor(dispatch: Dispatch<AppointmentActions>) {
    this._dispatch = dispatch;
  }
  fetchStart = () => this._dispatch(fetchStartAction());

  fetchPendingStart = () => this._dispatch(fetchPendingStartAction());

  fetchUpcomingStart = () => this._dispatch(fetchUpcomingStartAction());

  acceptStart = (appointmentId: number, roomId?: string | null) =>
    this._dispatch(acceptStartAction(appointmentId, roomId));

  // reserveStart = (payload) => this.dispatch({ type: Types.RESERVE_START, payload });

  // confirmStart = (payload) => this.dispatch({ type: Types.CONFIRM_START, payload });

  fetchOneStart = (roomId: string) => this._dispatch(fetchOneStartAction(roomId));

  getServerTimeStart = () => this._dispatch(getServerTimeStartAction());

  cancelStart = (roomId: string) => this._dispatch(cancelStartAction(roomId));

  rejectStart = (appointmentId: number, roomId?: string | null) =>
    this._dispatch(rejectStartAction(appointmentId, roomId));

  clearCurrent = () => this._dispatch(clearCurrentAction());

  resetError = () => this._dispatch(resetError());
}
