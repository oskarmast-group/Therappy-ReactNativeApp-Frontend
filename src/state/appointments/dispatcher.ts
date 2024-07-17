import {Dispatch} from 'react';
import {
  AppointmentActions,
  ConfirmStartPayload,
  ReserveStartPayload,
} from './actionTypes';
import {
  acceptStartAction,
  cancelStartAction,
  clearCurrentAppointmentAction,
  clearCurrentReservationAction,
  confirmStartAction,
  fetchOneStartAction,
  fetchPendingStartAction,
  fetchStartAction,
  fetchUpcomingStartAction,
  getServerTimeStartAction,
  rejectStartAction,
  reserveStartAction,
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

  reserveStart = (payload: ReserveStartPayload) =>
    this._dispatch(reserveStartAction(payload));

  confirmStart = (payload: ConfirmStartPayload) =>
    this._dispatch(confirmStartAction(payload));

  fetchOneStart = (roomId: string) =>
    this._dispatch(fetchOneStartAction(roomId));

  getServerTimeStart = () => this._dispatch(getServerTimeStartAction());

  cancelStart = (roomId: string) => this._dispatch(cancelStartAction(roomId));

  rejectStart = (appointmentId: number, roomId?: string | null) =>
    this._dispatch(rejectStartAction(appointmentId, roomId));

  clearCurrentAppointment = () =>
    this._dispatch(clearCurrentAppointmentAction());

  clearCurrentReservation = () =>
    this._dispatch(clearCurrentReservationAction());

  resetError = () => this._dispatch(resetError());
}
