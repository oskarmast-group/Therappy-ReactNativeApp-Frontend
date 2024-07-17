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
  DeletePaymentMethodError,
  DeletePaymentMethodStart,
  DeletePaymentMethodStartPayload,
  DeletePaymentMethodSuccess,
  FetchAccountInformationError,
  FetchAccountInformationStart,
  FetchAccountInformationSuccess,
  FetchError,
  FetchPaymentMethodsError,
  FetchPaymentMethodsStart,
  FetchPaymentMethodsSuccess,
  FetchPaymentMethodsSuccessPayload,
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
import {AccountInformation} from '../../interfaces/User/Payments';

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

export const addDocumentationAction = (
  payload: Documentation,
): AddDocumentation => ({
  type: ACTION_STRINGS.ADD_DOCUMENTATION,
  payload,
});

export const updateDocumentationAction = (
  payload: UpdateDocumentationPayload,
): UpdateDocumentation => ({
  type: ACTION_STRINGS.UPDATE_DOCUMENTATION,
  payload,
});

export const deleteDocumentationAction = (
  payload: string,
): DeleteDocumentation => ({
  type: ACTION_STRINGS.DELETE_DOCUMENTATION,
  payload,
});

export const updateStartAction = (
  payload: UpdateStartPayload,
): UpdateStart => ({
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

export const updateTherapistStartAction = (
  payload: UpdateTherapistStartPayload,
): UpdateTherapistStart => ({
  type: ACTION_STRINGS.UPDATE_THERAPIST_START,
  payload,
});

export const acceptInvitationStartAction = (
  payload: AcceptInvitationStartPayload,
): AcceptInvitationStart => ({
  type: ACTION_STRINGS.ACCEPT_INVITATION_START,
  payload,
});

export const acceptInvitationSuccessAction = (): AcceptInvitationSuccess => ({
  type: ACTION_STRINGS.ACCEPT_INVITATION_SUCCESS,
  payload: null,
});

export const acceptInvitationErrorAction = (
  payload: any,
): AcceptInvitationError => ({
  type: ACTION_STRINGS.ACCEPT_INVITATION_ERROR,
  payload,
});

export const fetchPaymentMethodsStartAction = (): FetchPaymentMethodsStart => ({
  type: ACTION_STRINGS.FETCH_PAYMENT_METHODS_START,
  payload: null,
});

export const fetchPaymentMethodsSuccessAction = (
  payload: FetchPaymentMethodsSuccessPayload,
): FetchPaymentMethodsSuccess => ({
  type: ACTION_STRINGS.FETCH_PAYMENT_METHODS_SUCCESS,
  payload,
});

export const fetchPaymentMethodsErrorAction = (
  payload: any,
): FetchPaymentMethodsError => ({
  type: ACTION_STRINGS.FETCH_PAYMENT_METHODS_ERROR,
  payload,
});

export const deletePaymentMethodStartAction = (
  payload: DeletePaymentMethodStartPayload,
): DeletePaymentMethodStart => ({
  type: ACTION_STRINGS.DELETE_PAYMENT_METHOD_START,
  payload,
});

export const deletePaymentMethodSuccessAction = (
  payload: FetchPaymentMethodsSuccessPayload,
): DeletePaymentMethodSuccess => ({
  type: ACTION_STRINGS.DELETE_PAYMENT_METHOD_SUCCESS,
  payload,
});

export const deletePaymentMethodErrorAction = (
  payload: any,
): DeletePaymentMethodError => ({
  type: ACTION_STRINGS.DELETE_PAYMENT_METHOD_ERROR,
  payload,
});

export const fetchAccountInformationStartAction =
  (): FetchAccountInformationStart => ({
    type: ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_START,
    payload: null,
  });

export const fetchAccountInformationSuccessAction = (
  payload: AccountInformation,
): FetchAccountInformationSuccess => ({
  type: ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_SUCCESS,
  payload,
});

export const fetchAccountInformationErrorAction = (
  payload: any,
): FetchAccountInformationError => ({
  type: ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
