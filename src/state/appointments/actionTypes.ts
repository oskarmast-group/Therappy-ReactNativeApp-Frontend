import Appointment, {BaseAppointment} from '../../interfaces/Appointment';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: Appointment;
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

export type AppointmentActions =
  | FetchStart
  | FetchSuccess
  | FetchError
  | FetchUpcomingStart
  | FetchUpcomingSuccess
  | FetchUpcomingError
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
