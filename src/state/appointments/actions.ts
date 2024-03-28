import Appointment, {BaseAppointment} from '../../interfaces/Appointment';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  AcceptError,
  AcceptStart,
  AcceptSuccess,
  CancelError,
  CancelStart,
  CancelSuccess,
  ClearCurrent,
  FetchError,
  FetchOneError,
  FetchOneStart,
  FetchOneSuccess,
  FetchPendingError,
  FetchPendingStart,
  FetchPendingSuccess,
  FetchStart,
  FetchSuccess,
  FetchUpcomingError,
  FetchUpcomingStart,
  FetchUpcomingSuccess,
  GetServerTimeError,
  GetServerTimeStart,
  GetServerTimeSuccess,
  RejectError,
  RejectStart,
  RejectSuccess,
} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (
  payload: BaseAppointment[],
): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const fetchUpcomingStartAction = (): FetchUpcomingStart => ({
  type: ACTION_STRINGS.FETCH_UPCOMING_START,
  payload: null,
});

export const fetchUpcomingSuccessAction = (
  payload: BaseAppointment[],
): FetchUpcomingSuccess => ({
  type: ACTION_STRINGS.FETCH_UPCOMING_SUCCESS,
  payload,
});

export const fetchUpcomingErrorAction = (payload: any): FetchUpcomingError => ({
  type: ACTION_STRINGS.FETCH_UPCOMING_ERROR,
  payload,
});

export const fetchPendingStartAction = (): FetchPendingStart => ({
  type: ACTION_STRINGS.FETCH_PENDING_START,
  payload: null,
});

export const fetchPendingSuccessAction = (
  payload: BaseAppointment[],
): FetchPendingSuccess => ({
  type: ACTION_STRINGS.FETCH_PENDING_SUCCESS,
  payload,
});

export const fetchPendingErrorAction = (payload: any): FetchPendingError => ({
  type: ACTION_STRINGS.FETCH_PENDING_ERROR,
  payload,
});

export const acceptStartAction = (
  appointmentId: number,
  roomId?: string | null,
): AcceptStart => ({
  type: ACTION_STRINGS.ACCEPT_START,
  payload: {appointmentId, roomId},
});

export const acceptSuccessAction = (payload: Appointment): AcceptSuccess => ({
  type: ACTION_STRINGS.ACCEPT_SUCCESS,
  payload,
});

export const acceptErrorAction = (payload: any): AcceptError => ({
  type: ACTION_STRINGS.ACCEPT_ERROR,
  payload,
});

export const fetchOneStartAction = (roomId: string): FetchOneStart => ({
  type: ACTION_STRINGS.FETCH_ONE_START,
  payload: {roomId},
});

export const fetchOneSuccessAction = (
  payload: Appointment,
): FetchOneSuccess => ({
  type: ACTION_STRINGS.FETCH_ONE_SUCCESS,
  payload,
});

export const fetchOneErrorAction = (payload: any): FetchOneError => ({
  type: ACTION_STRINGS.FETCH_ONE_ERROR,
  payload,
});

export const getServerTimeStartAction = (): GetServerTimeStart => ({
  type: ACTION_STRINGS.GET_SERVER_TIME_START,
  payload: null,
});

export const getServerTimeSuccessAction = (
  payload: number,
): GetServerTimeSuccess => ({
  type: ACTION_STRINGS.GET_SERVER_TIME_SUCCESS,
  payload,
});

export const getServerTimeErrorAction = (payload: any): GetServerTimeError => ({
  type: ACTION_STRINGS.GET_SERVER_TIME_ERROR,
  payload,
});

export const clearCurrentAction = (): ClearCurrent => ({
  type: ACTION_STRINGS.CLEAR_CURRENT,
  payload: null,
});

export const cancelStartAction = (roomId: string): CancelStart => ({
  type: ACTION_STRINGS.CANCEL_START,
  payload: {roomId},
});

export const cancelSuccessAction = (payload: Appointment): CancelSuccess => ({
  type: ACTION_STRINGS.CANCEL_SUCCESS,
  payload,
});

export const cancelErrorAction = (payload: any): CancelError => ({
  type: ACTION_STRINGS.CANCEL_ERROR,
  payload,
});

export const rejectStartAction = (
  appointmentId: number,
  roomId?: string | null,
): RejectStart => ({
  type: ACTION_STRINGS.REJECT_START,
  payload: {appointmentId, roomId},
});

export const rejectSuccessAction = (payload: Appointment): RejectSuccess => ({
  type: ACTION_STRINGS.REJECT_SUCCESS,
  payload,
});

export const rejectErrorAction = (payload: any): RejectError => ({
  type: ACTION_STRINGS.REJECT_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
