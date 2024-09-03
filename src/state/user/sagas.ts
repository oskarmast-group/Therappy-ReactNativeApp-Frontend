import {takeLatest, put, all, call} from 'redux-saga/effects';
import {
  profileAPI,
  therapistAPI,
  stripeClientsAPI,
  stripeTherapistAPI,
  //   stripeTherapistAPI,
} from '../../resources/api';
import Types from './actionStrings';
import User from '../../interfaces/User';
import {
  acceptInvitationErrorAction,
  acceptInvitationSuccessAction,
  deletePaymentMethodErrorAction,
  deletePaymentMethodSuccessAction,
  fetchAccountInformationErrorAction,
  fetchAccountInformationSuccessAction,
  fetchErrorAction,
  fetchPaymentMethodsErrorAction,
  fetchPaymentMethodsStartAction,
  fetchPaymentMethodsSuccessAction,
  fetchStartAction,
  fetchSuccessAction,
  removeAssignmentErrorAction,
  removeAssignmentSuccessAction,
  updateErrorAction,
  updateImageErrorAction,
  updateImageSuccessAction,
  updateSuccessAction,
} from './actions';
import {processError} from '../utils';
import ACTION_STRINGS from './actionStrings';
import {
  AcceptInvitationStart,
  DeletePaymentMethodStart,
  FetchPaymentMethodsSuccessPayload,
  RemoveAssignmentStart,
  UpdateImageStart,
  UpdateStart,
  UpdateTherapistStart,
} from './actionTypes';
import {AccountInformation} from '../../interfaces/User/Payments';
import {fetchOneStartAction as fetchConversationStartAction} from '../conversations/actions';
import {toFormData} from '../../utils';

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

function* updateImageStartAsync({
  payload,
}: UpdateImageStart): Generator<unknown, void, User> {
  try {
    const form = toFormData(payload);
    yield profileAPI.updateImage(form);
    const newProfile = yield profileAPI.profile();
    yield put(updateImageSuccessAction());
    yield put(fetchSuccessAction(newProfile));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(updateImageErrorAction(message));
  }
}

function* updateImageStart() {
  yield takeLatest(ACTION_STRINGS.UPDATE_IMAGE_START, updateImageStartAsync);
}

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
    yield put(fetchStartAction());
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

function* fetchPaymentMethodsStartAsync(): Generator<
  unknown,
  void,
  FetchPaymentMethodsSuccessPayload
> {
  try {
    const res = yield stripeClientsAPI.paymentMethods();
    yield put(fetchPaymentMethodsSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchPaymentMethodsErrorAction(message));
  }
}

function* fetchPaymentMethodsStart() {
  yield takeLatest(
    ACTION_STRINGS.FETCH_PAYMENT_METHODS_START,
    fetchPaymentMethodsStartAsync,
  );
}

function* deletePaymentMethodStartAsync({
  payload,
}: DeletePaymentMethodStart): Generator<
  unknown,
  void,
  FetchPaymentMethodsSuccessPayload
> {
  try {
    const res = yield stripeClientsAPI.deletePaymentMethod(payload);
    yield put(deletePaymentMethodSuccessAction(res));
    yield put(fetchPaymentMethodsStartAction());
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(deletePaymentMethodErrorAction(message));
  }
}

function* deletePaymentMethodStart() {
  yield takeLatest(
    ACTION_STRINGS.DELETE_PAYMENT_METHOD_START,
    deletePaymentMethodStartAsync,
  );
}

function* acceptInvitationStartAsync({
  payload,
}: AcceptInvitationStart): Generator<unknown, void, null> {
  try {
    yield profileAPI.assignmentResponse(payload);
    yield put(acceptInvitationSuccessAction());
    yield put(fetchStartAction());
    yield put(fetchConversationStartAction(payload.conversationId));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(acceptInvitationErrorAction(message));
  }
}

function* acceptInvitationStart() {
  yield takeLatest(
    ACTION_STRINGS.ACCEPT_INVITATION_START,
    acceptInvitationStartAsync,
  );
}

function* fetchAccountInformationStartAsync(): Generator<
  unknown,
  void,
  AccountInformation
> {
  try {
    const res = yield stripeTherapistAPI.accountInformation();
    yield put(fetchAccountInformationSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchAccountInformationErrorAction(message));
  }
}

function* fetchAccountInformationStart() {
  yield takeLatest(
    ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_START,
    fetchAccountInformationStartAsync,
  );
}

function* removeAssignmentStartAsync({
  payload,
}: RemoveAssignmentStart): Generator<unknown, void, null> {
  try {
    yield profileAPI.removeAssignment(payload);
    yield put(removeAssignmentSuccessAction());
    yield put(fetchStartAction());
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(removeAssignmentErrorAction(message));
  }
}

function* removeAssignmentStart() {
  yield takeLatest(
    ACTION_STRINGS.REMOVE_ASSIGNMENT_START,
    removeAssignmentStartAsync,
  );
}

export default function* sagas() {
  yield all([
    call(fetchStart),
    call(updateImageStart),
    call(updateStart),
    call(updateTherapistStart),
    call(fetchPaymentMethodsStart),
    call(deletePaymentMethodStart),
    call(acceptInvitationStart),
    call(fetchAccountInformationStart),
    call(removeAssignmentStart),
  ]);
}
