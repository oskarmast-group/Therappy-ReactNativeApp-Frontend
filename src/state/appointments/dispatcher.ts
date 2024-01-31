import {Dispatch} from 'react';
import {AppointmentActions} from './actionTypes';
import {
  acceptStartAction,
  fetchOneStartAction,
  fetchPendingStartAction,
  fetchUpcomingStartAction,
  resetError,
} from './actions';

export default class Dispatcher {
  _dispatch: Dispatch<AppointmentActions>;

  constructor(dispatch: Dispatch<AppointmentActions>) {
    this._dispatch = dispatch;
  }
  // fetchStart = () => this.dispatch({ type: Types.FETCH_START, payload: {} });

  fetchPendingStart = () => this._dispatch(fetchPendingStartAction());

  fetchUpcomingStart = () => this._dispatch(fetchUpcomingStartAction());

  acceptStart = (appointmentId: number, roomId?: string) =>
    this._dispatch(acceptStartAction(appointmentId, roomId));

  // reserveStart = (payload) => this.dispatch({ type: Types.RESERVE_START, payload });

  // confirmStart = (payload) => this.dispatch({ type: Types.CONFIRM_START, payload });

  fetchOneStart = (roomId: string) =>
    this._dispatch(fetchOneStartAction(roomId));

  // getServerTimeStart = () => this.dispatch({ type: Types.GET_SERVER_TIME_START, payload: {} });

  // cancelStart = (payload) => this.dispatch({ type: Types.CANCEL_START, payload });

  // rejectStart = (payload) => this.dispatch({ type: Types.REJECT_START, payload });

  // clearCurrent = () => this.dispatch({ type: Types.CLEAR_CURRENT, payload: {} });

  resetError = () => this._dispatch(resetError());
}
