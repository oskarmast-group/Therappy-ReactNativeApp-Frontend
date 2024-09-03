import {Dispatch} from 'react';
import {
  AcceptInvitationStartPayload,
  DeletePaymentMethodStartPayload,
  RemoveAssignmentStartPayload,
  UpdateImageStartPayload,
  // DeletePaymentMethodStartPayload,
  UpdateStartPayload,
  UpdateTherapistStartPayload,
  UserActions,
} from './actionTypes';
import {
  acceptInvitationStartAction,
  deletePaymentMethodStartAction,
  fetchAccountInformationStartAction,
  // deletePaymentMethodStartAction,
  fetchPaymentMethodsStartAction,
  fetchStartAction,
  removeAssignmentStartAction,
  resetError,
  updateImageStartAction,
  updateStartAction,
  updateTherapistStartAction,
} from './actions';
export default class Dispatcher {
  _dispatch: Dispatch<UserActions>;

  constructor(dispatch: Dispatch<UserActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  updateImageStart = (payload: UpdateImageStartPayload) =>
    this._dispatch(updateImageStartAction(payload));

  updateStart = (payload: UpdateStartPayload) =>
    this._dispatch(updateStartAction(payload));

  updateTherapistStart = (payload: UpdateTherapistStartPayload) =>
    this._dispatch(updateTherapistStartAction(payload));

  //   setupIntentStart = () =>
  //     this.dispatch({type: Types.SETUP_INTENT_START, payload: {}});

  deletePaymentMethodStart = (payload: DeletePaymentMethodStartPayload) =>
    this._dispatch(deletePaymentMethodStartAction(payload));

  fetchPaymentMethodsStart = () =>
    this._dispatch(fetchPaymentMethodsStartAction());

  fetchAccountInformationStart = () =>
    this._dispatch(fetchAccountInformationStartAction());

  acceptInvitationStart = (payload: AcceptInvitationStartPayload) =>
    this._dispatch(acceptInvitationStartAction(payload));

  removeAssignmentStart = (payload: RemoveAssignmentStartPayload) =>
    this._dispatch(removeAssignmentStartAction(payload));

  resetError = () => this._dispatch(resetError());
}
