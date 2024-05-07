import Documentation from '../../interfaces/Documentation';
import User from '../../interfaces/User';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {
  AcceptInvitationError,
  AcceptInvitationStart,
  AcceptInvitationStartPayload,
  AcceptInvitationSuccess,
  AddDocumentation,
  DeleteDocumentation,
  FetchError,
  FetchStart,
  FetchSuccess,
  UpdateDocumentation,
  UpdateDocumentationPayload,
  UpdateError,
  UpdateStart,
  UpdateStartPayload,
  UpdateSuccess,
  UpdateTherapistStart,
  UpdateTherapistStartPayload,
} from './actionTypes';

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: User): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const addDocumentationAction = (payload: Documentation): AddDocumentation => ({
  type: ACTION_STRINGS.ADD_DOCUMENTATION,
  payload,
});

export const updateDocumentationAction = (payload: UpdateDocumentationPayload): UpdateDocumentation => ({
  type: ACTION_STRINGS.UPDATE_DOCUMENTATION,
  payload,
});

export const deleteDocumentationAction = (payload: string): DeleteDocumentation => ({
  type: ACTION_STRINGS.DELETE_DOCUMENTATION,
  payload,
});

export const updateStartAction = (payload: UpdateStartPayload): UpdateStart => ({
  type: ACTION_STRINGS.UPDATE_START,
  payload,
});

export const updateSuccessAction = (): UpdateSuccess => ({
  type: ACTION_STRINGS.UPDATE_SUCCESS,
  payload: null,
});

export const updateErrorAction = (payload: any): UpdateError => ({
  type: ACTION_STRINGS.UPDATE_ERROR,
  payload,
});

export const updateTherapistStartAction = (payload: UpdateTherapistStartPayload): UpdateTherapistStart => ({
  type: ACTION_STRINGS.UPDATE_THERAPIST_START,
  payload,
});

export const acceptInvitationStartAction = (payload: AcceptInvitationStartPayload): AcceptInvitationStart => ({
  type: ACTION_STRINGS.ACCEPT_INVITATION_START,
  payload,
});

export const acceptInvitationSuccessAction = (): AcceptInvitationSuccess => ({
  type: ACTION_STRINGS.ACCEPT_INVITATION_SUCCESS,
  payload: null,
});

export const acceptInvitationErrorAction = (payload: any): AcceptInvitationError => ({
  type: ACTION_STRINGS.ACCEPT_INVITATION_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
