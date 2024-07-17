import Category from '../../interfaces/Category';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {FetchError, FetchStart, FetchSuccess} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: Category[]): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
