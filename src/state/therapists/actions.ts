import Therapist, { BaseTherapist } from '../../interfaces/Therapist';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  FetchError,
  FetchProfileError,
  FetchProfileStart,
  FetchProfileSuccess,
  FetchStart,
  FetchSuccess,
} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: BaseTherapist[]): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const fetchProfileStartAction = (payload: number): FetchProfileStart => ({
  type: ACTION_STRINGS.FETCH_PROFILE_START,
  payload,
});

export const fetchProfileSuccessAction = (payload: Therapist): FetchProfileSuccess => ({
  type: ACTION_STRINGS.FETCH_PROFILE_SUCCESS,
  payload,
});

export const fetchProfileErrorAction = (payload: any): FetchProfileError => ({
  type: ACTION_STRINGS.FETCH_PROFILE_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
