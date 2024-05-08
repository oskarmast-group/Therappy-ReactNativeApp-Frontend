import Documentation from '../../interfaces/Documentation';
import TimeAvailability from '../../interfaces/TimeAvailability';
import User from '../../interfaces/User';
import UpdateTherapistFields from '../../interfaces/User/UpdateTherapistFields';
import UpdateUserFields from '../../interfaces/User/UpdateUserFields';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import { AccountInformation, IPaymentMethod, SetupIntentToken } from './state';

export type FetchPaymentMethodsStart = {
  type: ACTION_STRINGS.FETCH_PAYMENT_METHODS_START;
  payload: {};
};

export type FetchPaymentMethodsSuccess = {
  type: ACTION_STRINGS.FETCH_PAYMENT_METHODS_SUCCESS;
  payload: Array<IPaymentMethod>;
};

export type FetchPaymentMethodsError = {
  type: ACTION_STRINGS.FETCH_PAYMENT_METHODS_ERROR;
  payload: {};
};

export type DeletePaymentMethodStart = {
  type: ACTION_STRINGS.DELETE_PAYMENT_METHOD_START;
  payload: {};
};

export type DeletePaymentMethodSuccess = {
  type: ACTION_STRINGS.DELETE_PAYMENT_METHOD_SUCCESS;
  payload: {};
};

export type DeletePaymentMethodError = {
  type: ACTION_STRINGS.DELETE_PAYMENT_METHOD_ERROR;
  payload: {};
};

export type FetchAccountInformationStart = {
  type: ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_START;
  payload: {};
};

export type FetchAccountInformationSuccess = {
  type: ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_SUCCESS;
  payload: AccountInformation;
};

export type FetchAccountInformationError = {
  type: ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_ERROR;
  payload: any;
};

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

export type SetupIntentStart = {
  type: ACTION_STRINGS.SETUP_INTENT_START;
  payload: {};
};

export type SetupIntentSuccess = {
  type: ACTION_STRINGS.SETUP_INTENT_SUCCESS;
  payload: SetupIntentToken;
};

export type SetupIntentError = {
  type: ACTION_STRINGS.SETUP_INTENT_ERROR;
  payload: any;
};

export type UserActions =
  | FetchPaymentMethodsStart
  | FetchPaymentMethodsSuccess
  | FetchPaymentMethodsError
  | DeletePaymentMethodStart
  | DeletePaymentMethodSuccess
  | DeletePaymentMethodError
  | FetchAccountInformationStart
  | FetchAccountInformationSuccess
  | FetchAccountInformationError
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
  | SetupIntentStart
  | SetupIntentSuccess
  | SetupIntentError
  | ResetError<ACTION_STRINGS.RESET_ERROR>;
