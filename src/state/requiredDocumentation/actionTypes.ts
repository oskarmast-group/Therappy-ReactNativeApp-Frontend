import Documentation from '../../interfaces/Documentation';
import RequiredDocumentation from '../../interfaces/Documentation/RequiredDocumentation';
import File from '../../interfaces/File';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: RequiredDocumentation[];
};

export type FetchError = {
  type: ACTION_STRINGS.FETCH_ERROR;
  payload: any;
};

export type NewDocStartPayload = {
  doc: File;
  documentType: string;
  uuid: string;
};

export type NewDocStart = {
  type: ACTION_STRINGS.NEW_DOC_START;
  payload: NewDocStartPayload;
};

export type NewDocSuccess = {
  type: ACTION_STRINGS.NEW_DOC_SUCCESS;
  payload: Documentation;
};

export type NewDocError = {
  type: ACTION_STRINGS.NEW_DOC_ERROR;
  payload: any;
};

export type UpdateStartPayload = {
  doc: File;
  uuid: string;
};

export type UpdateStart = {
  type: ACTION_STRINGS.UPDATE_START;
  payload: UpdateStartPayload;
};

export type UpdateSuccess = {
  type: ACTION_STRINGS.UPDATE_SUCCESS;
  payload: Documentation;
};

export type UpdateError = {
  type: ACTION_STRINGS.UPDATE_ERROR;
  payload: any;
};

export type DeleteStart = {
  type: ACTION_STRINGS.DELETE_START;
  payload: string;
};

export type DeleteSuccess = {
  type: ACTION_STRINGS.DELETE_SUCCESS;
  payload: Documentation;
};

export type DeleteError = {
  type: ACTION_STRINGS.DELETE_ERROR;
  payload: any;
};

export type RequiredDocumentationActions =
  | FetchError
  | FetchStart
  | FetchSuccess
  | NewDocError
  | NewDocStart
  | NewDocSuccess
  | UpdateError
  | UpdateStart
  | UpdateSuccess
  | DeleteError
  | DeleteStart
  | DeleteSuccess
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
