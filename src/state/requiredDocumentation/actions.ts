import Documentation from '../../interfaces/Documentation';
import RequiredDocumentation from '../../interfaces/Documentation/RequiredDocumentation';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  FetchError,
  FetchStart,
  FetchSuccess,
  UpdateError,
  UpdateStart,
  UpdateStartPayload,
  UpdateSuccess,
  NewDocError,
  NewDocStart,
  NewDocStartPayload,
  NewDocSuccess,
  DeleteStart,
  DeleteSuccess,
  DeleteError,
} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: RequiredDocumentation[]): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const newDocStartAction = (payload: NewDocStartPayload): NewDocStart => ({
  type: ACTION_STRINGS.NEW_DOC_START,
  payload,
});

export const newDocSuccessAction = (payload: Documentation): NewDocSuccess => ({
  type: ACTION_STRINGS.NEW_DOC_SUCCESS,
  payload,
});

export const newDocErrorAction = (payload: any): NewDocError => ({
  type: ACTION_STRINGS.NEW_DOC_ERROR,
  payload,
});

export const updateStartAction = (payload: UpdateStartPayload): UpdateStart => ({
  type: ACTION_STRINGS.UPDATE_START,
  payload,
});

export const updateSuccessAction = (payload: Documentation): UpdateSuccess => ({
  type: ACTION_STRINGS.UPDATE_SUCCESS,
  payload,
});

export const updateErrorAction = (payload: any): UpdateError => ({
  type: ACTION_STRINGS.UPDATE_ERROR,
  payload,
});

export const deleteStartAction = (payload: string): DeleteStart => ({
  type: ACTION_STRINGS.DELETE_START,
  payload,
});

export const deleteSuccessAction = (payload: Documentation): DeleteSuccess => ({
  type: ACTION_STRINGS.DELETE_SUCCESS,
  payload,
});

export const deleteErrorAction = (payload: any): DeleteError => ({
  type: ACTION_STRINGS.DELETE_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
