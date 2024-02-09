import {takeLatest, put, all, call} from 'redux-saga/effects';
import {
  profileAPI,
  therapistAPI,
  //   stripeClientsAPI,
  //   stripeTherapistAPI,
} from '../../resources/api';
import Types from './actionStrings';
import User from '../../interfaces/User';
import {
  fetchErrorAction,
  fetchSuccessAction,
  updateErrorAction,
  updateSuccessAction,
} from './actions';
import {processError} from '../utils';
import ACTION_STRINGS from './actionStrings';
import {UpdateStart, UpdateTherapistStart} from './actionTypes';

function* fetchStartAsync(): Generator<unknown, void, User> {
  try {
    const res = yield profileAPI.profile();
    yield put(fetchSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchErrorAction(message));
  }
}

function* fetchStart() {
  yield takeLatest(Types.FETCH_START, fetchStartAsync);
}

// function* updateImageStartAsync({payload}) {
//   try {
//     const form = toFormData({profile: payload});
//     yield profileAPI.updateImage(form);
//     const newProfile = yield profileAPI.profile();
//     yield put({type: Types.UPDATE_SUCCESS, payload: newProfile});
//   } catch (error) {
//     const message = processError(error);
//     console.error(message);
//     yield put({type: Types.UPDATE_ERROR, payload: message});
//   }
// }

// function* updateImageStart() {
//   yield takeLatest(Types.UPDATE_IMAGE_START, updateImageStartAsync);
// }

function* updateStartAsync({
  payload,
}: UpdateStart): Generator<unknown, void, null> {
  try {
    const {key, value} = payload;
    yield profileAPI.update({[key]: value});
    yield put(updateSuccessAction());
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(updateErrorAction(message));
  }
}

function* updateStart() {
  yield takeLatest(ACTION_STRINGS.UPDATE_START, updateStartAsync);
}

function* updateTherapistStartAsync({
  payload,
}: UpdateTherapistStart): Generator<unknown, void, null> {
  try {
    const {key, value} = payload;
    yield therapistAPI.update({[key]: value});
    yield put(updateSuccessAction());
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(updateErrorAction(message));
  }
}

function* updateTherapistStart() {
  yield takeLatest(
    ACTION_STRINGS.UPDATE_THERAPIST_START,
    updateTherapistStartAsync,
  );
}

// function* updateSuccess() {
//   yield takeLatest(Types.UPDATE_SUCCESS, fetchStartAsync);
// }

// function* setupIntentStartAsync() {
//   try {
//     const res = yield stripeClientsAPI.setupIntent();
//     yield put({type: Types.SETUP_INTENT_SUCCESS, payload: res});
//   } catch (error) {
//     const message = processError(error);
//     console.error(message);
//     yield put({type: Types.SETUP_INTENT_ERROR, payload: message});
//   }
// }

// function* setupIntentStart() {
//   yield takeLatest(Types.SETUP_INTENT_START, setupIntentStartAsync);
// }

// function* fetchPaymentMethodsStartAsync() {
//   try {
//     const res = yield stripeClientsAPI.paymentMethods();
//     yield put({
//       type: Types.FETCH_PAYMENT_METHODS_SUCCESS,
//       payload: res.methods,
//     });
//   } catch (error) {
//     const message = processError(error);
//     console.error(message);
//     yield put({type: Types.FETCH_PAYMENT_METHODS_ERROR, payload: message});
//   }
// }

// function* fetchPaymentMethodsStart() {
//   yield takeLatest(
//     Types.FETCH_PAYMENT_METHODS_START,
//     fetchPaymentMethodsStartAsync,
//   );
// }

// function* deletePaymentMethodStartAsync({payload}) {
//   try {
//     const res = yield stripeClientsAPI.deletePaymentMethod({
//       paymentId: payload,
//     });
//     yield put({
//       type: Types.DELETE_PAYMENT_METHOD_SUCCESS,
//       payload: res.methods,
//     });
//     yield put({type: Types.FETCH_PAYMENT_METHODS_START, payload: {}});
//   } catch (error) {
//     const message = processError(error);
//     console.error(message);
//     yield put({type: Types.DELETE_PAYMENT_METHOD_ERROR, payload: message});
//   }
// }

// function* deletePaymentMethodStart() {
//   yield takeLatest(
//     Types.DELETE_PAYMENT_METHOD_START,
//     deletePaymentMethodStartAsync,
//   );
// }

// function* acceptInvitationStartAsync({payload}) {
//   try {
//     yield profileAPI.assignmentResponse(payload);
//     yield put({type: Types.ACCEPT_INVITATION_SUCCESS, payload: {}});
//     yield put({type: Types.FETCH_START, payload: {}});
//   } catch (error) {
//     const message = processError(error);
//     console.error(message);
//     yield put({type: Types.ACCEPT_INVITATION_SUCCESS, payload: message});
//   }
// }

// function* acceptInvitationStart() {
//   yield takeLatest(Types.ACCEPT_INVITATION_START, acceptInvitationStartAsync);
// }

// function* fetchAccountInformationStartAsync() {
//   try {
//     const res = yield stripeTherapistAPI.accountInformation();
//     yield put({type: Types.FETCH_ACCOUNT_INFORMATION_SUCCESS, payload: res});
//   } catch (error) {
//     const message = processError(error);
//     console.error(message);
//     yield put({type: Types.FETCH_ACCOUNT_INFORMATION_ERROR, payload: message});
//   }
// }

// function* fetchAccountInformationStart() {
//   yield takeLatest(
//     Types.FETCH_ACCOUNT_INFORMATION_START,
//     fetchAccountInformationStartAsync,
//   );
// }

export default function* sagas() {
  yield all([
    call(fetchStart),
    // call(updateImageStart),
    call(updateStart),
    call(updateTherapistStart),
    // call(updateSuccess),
    // call(setupIntentStart),
    // call(fetchPaymentMethodsStart),
    // call(deletePaymentMethodStart),
    // call(acceptInvitationStart),
    // call(fetchAccountInformationStart),
  ]);
}
