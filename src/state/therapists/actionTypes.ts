import Therapist, {BaseTherapist} from '../../interfaces/Therapist';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: BaseTherapist[];
};

export type FetchError = {
  type: ACTION_STRINGS.FETCH_ERROR;
  payload: any;
};

export type FetchProfileStart = {
  type: ACTION_STRINGS.FETCH_PROFILE_START;
  payload: number;
};

export type FetchProfileSuccess = {
  type: ACTION_STRINGS.FETCH_PROFILE_SUCCESS;
  payload: Therapist;
};

export type FetchProfileError = {
  type: ACTION_STRINGS.FETCH_PROFILE_ERROR;
  payload: any;
};

export type TherapistActions =
  | FetchError
  | FetchStart
  | FetchSuccess
  | FetchProfileStart
  | FetchProfileSuccess
  | FetchProfileError
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
