import Documentation from '../../interfaces/Documentation';
import TimeAvailability from '../../interfaces/TimeAvailability';
import User from '../../interfaces/User';
import UpdateTherapistFields from '../../interfaces/User/UpdateTherapistFields';
import UpdateUserFields from '../../interfaces/User/UpdateUserFields';
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

export type UpdateStartPayload = {
  key: keyof UpdateUserFields;
  value: string;
};

export type UpdateStart = {
  type: ACTION_STRINGS.UPDATE_START;
  payload: UpdateStartPayload;
};

export type UpdateSuccess = {
  type: ACTION_STRINGS.UPDATE_SUCCESS;
  payload: null;
};

export type UpdateError = {
  type: ACTION_STRINGS.UPDATE_ERROR;
  payload: any;
};

export type UpdateTherapistStartPayload = {
  key: keyof UpdateTherapistFields;
  value: string | TimeAvailability;
};

export type UpdateTherapistStart = {
  type: ACTION_STRINGS.UPDATE_THERAPIST_START;
  payload: UpdateTherapistStartPayload;
};

export type AcceptInvitationStartPayload = {
  accept: boolean;
  invitationUUID: string;
};

export type AcceptInvitationStart = {
  type: ACTION_STRINGS.ACCEPT_INVITATION_START;
  payload: AcceptInvitationStartPayload;
};

export type AcceptInvitationSuccess = {
  type: ACTION_STRINGS.ACCEPT_INVITATION_SUCCESS;
  payload: null;
};

export type AcceptInvitationError = {
  type: ACTION_STRINGS.ACCEPT_INVITATION_ERROR;
  payload: any;
};

export type UserActions =
  | FetchError
  | FetchStart
  | FetchSuccess
  | AddDocumentation
  | UpdateDocumentation
  | DeleteDocumentation
  | UpdateStart
  | UpdateSuccess
  | UpdateError
  | UpdateTherapistStart
  | AcceptInvitationStart
  | AcceptInvitationSuccess
  | AcceptInvitationError
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
