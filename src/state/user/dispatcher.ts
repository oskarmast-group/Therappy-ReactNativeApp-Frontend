import {Dispatch} from 'react';
import {UserActions} from './actionTypes';
import {fetchStartAction, resetError} from './actions';
export default class Dispatcher {
  _dispatch: Dispatch<UserActions>;

  constructor(dispatch: Dispatch<UserActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  //   updateImageStart = image =>
  //     this.dispatch({type: Types.UPDATE_IMAGE_START, payload: image});

  //   updateStart = payload => this.dispatch({type: Types.UPDATE_START, payload});

  //   updateTherapistStart = payload =>
  //     this.dispatch({type: Types.UPDATE_THERAPIST_START, payload});

  //   setupIntentStart = () =>
  //     this.dispatch({type: Types.SETUP_INTENT_START, payload: {}});

  //   deletePaymentMethodStart = payload =>
  //     this.dispatch({type: Types.DELETE_PAYMENT_METHOD_START, payload});

  //   fetchPaymentMethodsStart = () =>
  //     this.dispatch({type: Types.FETCH_PAYMENT_METHODS_START, payload: {}});

  //   fetchAccountInformationStart = () =>
  //     this.dispatch({type: Types.FETCH_ACCOUNT_INFORMATION_START, payload: {}});

  //   acceptInvitationStart = payload =>
  //     this.dispatch({type: Types.ACCEPT_INVITATION_START, payload});

  resetError = () => this._dispatch(resetError());
}
