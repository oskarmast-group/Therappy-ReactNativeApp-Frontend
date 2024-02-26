import {Dispatch} from 'react';
import {
  AcceptInvitationStartPayload,
  UpdateStartPayload,
  UpdateTherapistStartPayload,
  UserActions,
} from './actionTypes';
import {
  acceptInvitationStartAction,
  fetchStartAction,
  resetError,
  updateStartAction,
  updateTherapistStartAction,
} from './actions';
export default class Dispatcher {
  _dispatch: Dispatch<UserActions>;

  constructor(dispatch: Dispatch<UserActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  //   updateImageStart = image =>
  //     this.dispatch({type: Types.UPDATE_IMAGE_START, payload: image});

  updateStart = (payload: UpdateStartPayload) =>
    this._dispatch(updateStartAction(payload));

  updateTherapistStart = (payload: UpdateTherapistStartPayload) =>
    this._dispatch(updateTherapistStartAction(payload));

  //   setupIntentStart = () =>
  //     this.dispatch({type: Types.SETUP_INTENT_START, payload: {}});

  //   deletePaymentMethodStart = payload =>
  //     this.dispatch({type: Types.DELETE_PAYMENT_METHOD_START, payload});

  //   fetchPaymentMethodsStart = () =>
  //     this.dispatch({type: Types.FETCH_PAYMENT_METHODS_START, payload: {}});

  //   fetchAccountInformationStart = () =>
  //     this.dispatch({type: Types.FETCH_ACCOUNT_INFORMATION_START, payload: {}});

  acceptInvitationStart = (payload: AcceptInvitationStartPayload) =>
    this._dispatch(acceptInvitationStartAction(payload));

  resetError = () => this._dispatch(resetError());
}
