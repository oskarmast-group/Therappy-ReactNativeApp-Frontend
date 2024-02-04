import Documentation from '../../interfaces/Documentation';
import User from '../../interfaces/User';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';

export type FetchStart = {
  type: ACTION_STRINGS.FETCH_START;
  payload: null;
};

export type FetchSuccess = {
  type: ACTION_STRINGS.FETCH_SUCCESS;
  payload: User;
};

export type FetchError = {
  type: ACTION_STRINGS.FETCH_ERROR;
  payload: any;
};

export type AddDocumentation = {
  type: ACTION_STRINGS.ADD_DOCUMENTATION;
  payload: Documentation;
};

export type UpdateDocumentationPayload = {
  uuid: string;
  document: Documentation;
};

export type UpdateDocumentation = {
  type: ACTION_STRINGS.UPDATE_DOCUMENTATION;
  payload: UpdateDocumentationPayload;
};

export type DeleteDocumentation = {
  type: ACTION_STRINGS.DELETE_DOCUMENTATION;
  payload: string;
};

export type UserActions =
  | FetchError
  | FetchStart
  | FetchSuccess
  | AddDocumentation
  | UpdateDocumentation
  | DeleteDocumentation
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
