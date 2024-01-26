import Appointment, {BaseAppointment} from '../../interfaces/Appointment';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  FetchError,
  FetchStart,
  FetchSuccess,
  FetchUpcomingError,
  FetchUpcomingStart,
  FetchUpcomingSuccess,
} from './actionTypes';

// export const fetchMetadataStartAction = (payload: string): FetchMetadataStart => ({
//     type: ACTION_STRINGS.FETCH_METADATA_START,
//     payload,
// });

// export const fetchMetadataSuccessAction = (payload: Metadata): FetchMetadataSuccess => ({
//     type: ACTION_STRINGS.FETCH_METADATA_SUCCESS,
//     payload,
// });

// export const fetchMetadataErrorAction = (payload: any): FetchError => ({
//     type: ACTION_STRINGS.FETCH_METADATA_ERROR,
//     payload,
// });

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: Appointment): FetchSuccess => ({
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

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
