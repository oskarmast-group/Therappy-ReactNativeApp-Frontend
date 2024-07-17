import {takeLatest, put, all, call} from 'redux-saga/effects';
import Appointment, {BaseAppointment} from '../../interfaces/Appointment';
import {processError} from '../utils';
import {
  acceptErrorAction,
  acceptSuccessAction,
  cancelErrorAction,
  cancelSuccessAction,
  confirmErrorAction,
  confirmSuccessAction,
  fetchErrorAction,
  fetchOneErrorAction,
  fetchOneStartAction,
  fetchOneSuccessAction,
  fetchPendingErrorAction,
  fetchPendingStartAction,
  fetchPendingSuccessAction,
  fetchSuccessAction,
  fetchUpcomingErrorAction,
  fetchUpcomingStartAction,
  fetchUpcomingSuccessAction,
  getServerTimeErrorAction,
  getServerTimeSuccessAction,
  rejectErrorAction,
  rejectSuccessAction,
  reserveErrorAction,
  reserveSuccessAction,
} from './actions';
import ACTION_STRINGS from './actionStrings';
import {appointmentsAPI} from '../../resources/api';
import {
  AcceptStart,
  CancelStart,
  ConfirmStart,
  FetchOneStart,
  RejectStart,
  ReserveStart,
} from './actionTypes';
import Reservation from '../../interfaces/Reservations';

function* fetchUpcomingStartAsync(): Generator<
  unknown,
  void,
  BaseAppointment[]
> {
  try {
    const res = yield appointmentsAPI.getUpcoming();
    yield put(fetchUpcomingSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchErrorAction(message));
  }
}

function* fetchUpcomingStart() {
  yield takeLatest(
    ACTION_STRINGS.FETCH_UPCOMING_START,
    fetchUpcomingStartAsync,
  );
}

function* fetchStartAsync(): Generator<unknown, void, BaseAppointment[]> {
  try {
    const res = yield appointmentsAPI.getAll();
    yield put(fetchSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchUpcomingErrorAction(message));
  }
}

function* fetchStart() {
  yield takeLatest(ACTION_STRINGS.FETCH_START, fetchStartAsync);
}

function* reserveStartAsync({
  payload,
}: ReserveStart): Generator<unknown, void, Reservation> {
  try {
    const res = yield appointmentsAPI.reserve(payload);
    yield put(reserveSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(reserveErrorAction(message));
  }
}

function* reserveStart() {
  yield takeLatest(ACTION_STRINGS.RESERVE_START, reserveStartAsync);
}

function* confirmStartAsync({
  payload,
}: ConfirmStart): Generator<unknown, void, Appointment> {
  try {
    const res = yield appointmentsAPI.confirm(payload);
    yield put(confirmSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(confirmErrorAction(message));
  }
}

function* confirmStart() {
  yield takeLatest(ACTION_STRINGS.CONFIRM_START, confirmStartAsync);
}

function* fetchPendingStartAsync(): Generator<
  unknown,
  void,
  BaseAppointment[]
> {
  try {
    const res = yield appointmentsAPI.getPending();
    yield put(fetchPendingSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchPendingErrorAction(message));
  }
}

function* fetchPendingStart() {
  yield takeLatest(ACTION_STRINGS.FETCH_PENDING_START, fetchPendingStartAsync);
}

function* acceptStartAsync({
  payload,
}: AcceptStart): Generator<unknown, void, Appointment> {
  try {
    const {appointmentId, roomId} = payload;
    const res = yield appointmentsAPI.accept({appointmentId});
    yield put(acceptSuccessAction(res));

    if (roomId) {
      yield put(fetchOneStartAction(roomId));
    } else {
      yield put(fetchPendingStartAction());
    }
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(acceptErrorAction(message));
  }
}

function* acceptStart() {
  yield takeLatest(ACTION_STRINGS.ACCEPT_START, acceptStartAsync);
}

function* fetchOneStartAsync({
  payload,
}: FetchOneStart): Generator<unknown, void, Appointment> {
  try {
    const res = yield appointmentsAPI.view(payload.roomId);
    yield put(fetchOneSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchOneErrorAction(message));
  }
}

function* fetchOneStart() {
  yield takeLatest(ACTION_STRINGS.FETCH_ONE_START, fetchOneStartAsync);
}

function* getServerTimeStartAsync(): Generator<unknown, void, {now: number}> {
  try {
    const res = yield appointmentsAPI.serverTime();
    yield put(getServerTimeSuccessAction(res.now));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(getServerTimeErrorAction(message));
  }
}

function* getServerTimeStart() {
  yield takeLatest(
    ACTION_STRINGS.GET_SERVER_TIME_START,
    getServerTimeStartAsync,
  );
}

function* cancelStartAsync({
  payload,
}: CancelStart): Generator<unknown, void, Appointment> {
  try {
    const res = yield appointmentsAPI.cancel(payload);
    yield put(cancelSuccessAction(res));
    yield put(fetchOneStartAction(payload.roomId));
    yield put(fetchPendingStartAction());
    yield put(fetchUpcomingStartAction());
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(cancelErrorAction(message));
  }
}

function* cancelStart() {
  yield takeLatest(ACTION_STRINGS.CANCEL_START, cancelStartAsync);
}

function* rejectStartAsync({
  payload,
}: RejectStart): Generator<unknown, void, Appointment> {
  try {
    const {appointmentId, roomId} = payload;
    const res = yield appointmentsAPI.reject({appointmentId});
    yield put(rejectSuccessAction(res));

    if (roomId) {
      yield put(fetchOneStartAction(roomId));
    } else {
      yield put(fetchPendingStartAction());
      yield put(fetchUpcomingStartAction());
    }
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(rejectErrorAction(message));
  }
}

function* rejectStart() {
  yield takeLatest(ACTION_STRINGS.REJECT_START, rejectStartAsync);
}

export default function* sagas() {
  yield all([
    call(fetchUpcomingStart),
    call(fetchStart),
    call(reserveStart),
    call(confirmStart),
    call(fetchPendingStart),
    call(acceptStart),
    call(fetchOneStart),
    call(getServerTimeStart),
    call(cancelStart),
    call(rejectStart),
  ]);
}
