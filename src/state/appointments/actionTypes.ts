import Appointment, { BaseAppointment } from '../../interfaces/Appointment';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: BaseAppointment[];
};

export type FetchError = {
  type: ACTION_STRINGS.FETCH_ERROR;
  payload: any;
};

export type FetchUpcomingStart = {
  type: ACTION_STRINGS.FETCH_UPCOMING_START;
  payload: null;
};

export type FetchUpcomingSuccess = {
  type: ACTION_STRINGS.FETCH_UPCOMING_SUCCESS;
  payload: BaseAppointment[];
};

export type FetchUpcomingError = {
  type: ACTION_STRINGS.FETCH_UPCOMING_ERROR;
  payload: any;
};

export type FetchPendingStart = {
  type: ACTION_STRINGS.FETCH_PENDING_START;
  payload: null;
};

export type FetchPendingSuccess = {
  type: ACTION_STRINGS.FETCH_PENDING_SUCCESS;
  payload: BaseAppointment[];
};

export type FetchPendingError = {
  type: ACTION_STRINGS.FETCH_PENDING_ERROR;
  payload: any;
};

export type AcceptStartPayload = {
  appointmentId: number;
  roomId?: string | null;
};

export type AcceptStart = {
  type: ACTION_STRINGS.ACCEPT_START;
  payload: AcceptStartPayload;
};

export type AcceptSuccess = {
  type: ACTION_STRINGS.ACCEPT_SUCCESS;
  payload: Appointment;
};

export type AcceptError = {
  type: ACTION_STRINGS.ACCEPT_ERROR;
  payload: any;
};

export type FetchOneStart = {
  type: ACTION_STRINGS.FETCH_ONE_START;
  payload: { roomId: string };
};

export type FetchOneSuccess = {
  type: ACTION_STRINGS.FETCH_ONE_SUCCESS;
  payload: Appointment;
};

export type FetchOneError = {
  type: ACTION_STRINGS.FETCH_ONE_ERROR;
  payload: any;
};

export type GetServerTimeStart = {
  type: ACTION_STRINGS.GET_SERVER_TIME_START;
  payload: null;
};

export type GetServerTimeSuccess = {
  type: ACTION_STRINGS.GET_SERVER_TIME_SUCCESS;
  payload: number;
};

export type GetServerTimeError = {
  type: ACTION_STRINGS.GET_SERVER_TIME_ERROR;
  payload: any;
};

export type ClearCurrent = {
  type: ACTION_STRINGS.CLEAR_CURRENT;
  payload: null;
};

export type CancelStartPayload = {
  roomId: string;
};

export type CancelStart = {
  type: ACTION_STRINGS.CANCEL_START;
  payload: CancelStartPayload;
};

export type CancelSuccess = {
  type: ACTION_STRINGS.CANCEL_SUCCESS;
  payload: Appointment;
};

export type CancelError = {
  type: ACTION_STRINGS.CANCEL_ERROR;
  payload: any;
};

export type RejectStartPayload = {
  appointmentId: number;
  roomId?: string | null;
};

export type RejectStart = {
  type: ACTION_STRINGS.REJECT_START;
  payload: RejectStartPayload;
};

export type RejectSuccess = {
  type: ACTION_STRINGS.REJECT_SUCCESS;
  payload: Appointment;
};

export type RejectError = {
  type: ACTION_STRINGS.REJECT_ERROR;
  payload: any;
};

export type AppointmentActions =
  | FetchStart
  | FetchSuccess
  | FetchError
  | FetchUpcomingStart
  | FetchUpcomingSuccess
  | FetchUpcomingError
  | FetchPendingStart
  | FetchPendingSuccess
  | FetchPendingError
  | AcceptStart
  | AcceptSuccess
  | AcceptError
  | FetchOneStart
  | FetchOneSuccess
  | FetchOneError
  | GetServerTimeStart
  | GetServerTimeSuccess
  | GetServerTimeError
  | ClearCurrent
  | CancelStart
  | CancelSuccess
  | CancelError
  | RejectStart
  | RejectSuccess
  | RejectError
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
