import {takeLatest, put, all, call} from 'redux-saga/effects';
import Appointment, {BaseAppointment} from '../../interfaces/Appointment';
import {processError} from '../utils';
import {
  acceptErrorAction,
  acceptSuccessAction,
  fetchErrorAction,
  fetchOneErrorAction,
  fetchOneStartAction,
  fetchOneSuccessAction,
  fetchPendingErrorAction,
  fetchPendingStartAction,
  fetchPendingSuccessAction,
  fetchSuccessAction,
  fetchUpcomingErrorAction,
  fetchUpcomingSuccessAction,
} from './actions';
import ACTION_STRINGS from './actionStrings';
import {appointmentsAPI} from '../../resources/api';
import {AcceptStart, FetchOneStart} from './actionTypes';

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

// function* reserveStartAsync({ payload }) {
//     try {
//         const res = yield appointmentsAPI.reserve(payload);
//         yield put({ type: Types.RESERVE_SUCCESS, payload: res });
//     } catch (error) {
//         const message = processError(error);
//         console.error(message);
//         yield put({ type: Types.RESERVE_ERROR, payload: message });
//     }
// }

// function* reserveStart() {
//   yield takeLatest(Types.RESERVE_START, reserveStartAsync);
// }

// function* confirmStartAsync({ payload }) {
//     try {
//         const res = yield appointmentsAPI.confirm(payload);
//         yield put({ type: Types.CONFIRM_SUCCESS, payload: res });
//     } catch (error) {
//         const message = processError(error);
//         console.error(message);
//         yield put({ type: Types.CONFIRM_ERROR, payload: message });
//     }
// }

// function* confirmStart() {
//   yield takeLatest(Types.CONFIRM_START, confirmStartAsync);
// }

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

// function* getServerTimeStartAsync() {
//     try {
//         const res = yield appointmentsAPI.serverTime();
//         yield put({ type: Types.GET_SERVER_TIME_SUCCESS, payload: res.now });
//     } catch (error) {
//         const message = processError(error);
//         console.error(message);
//         yield put({ type: Types.GET_SERVER_TIME_ERROR, payload: message });
//     }
// }

// function* getServerTimeStart() {
//     yield takeLatest(Types.GET_SERVER_TIME_START, getServerTimeStartAsync);
// }

// function* cancelStartAsync({ payload }) {
//     try {
//         yield appointmentsAPI.cancel(payload);
//         yield put({ type: Types.CANCEL_SUCCESS, payload: {} });
//         yield put({ type: Types.FETCH_ONE_START, payload: payload.roomId });
//     } catch (error) {
//         const message = processError(error);
//         console.error(message);
//         yield put({ type: Types.CANCEL_ERROR, payload: message });
//     }
// }

// function* cancelStart() {
//   yield takeLatest(Types.CANCEL_START, cancelStartAsync);
// }

// function* rejectStartAsync({ payload }) {
//     try {
//         const { appointmentId, roomId } = payload;
//         const res = yield appointmentsAPI.reject({ appointmentId });
//         yield put({ type: Types.REJECT_SUCCESS, payload: res });

//         if(roomId) {
//             yield put({ type: Types.FETCH_ONE_START, payload: roomId });
//         } else {
//             yield put({ type: Types.FETCH_PENDING_START, payload: {} });
//         }
//     } catch (error) {
//         const message = processError(error);
//         console.error(message);
//         yield put({ type: Types.REJECT_ERROR, payload: message });
//     }
// }

// function* rejectStart() {
//   yield takeLatest(Types.REJECT_START, rejectStartAsync);
// }

export default function* sagas() {
  yield all([
    call(fetchUpcomingStart),
    call(fetchStart),
    // call(reserveStart),
    // call(confirmStart),
    call(fetchPendingStart),
    call(acceptStart),
    call(fetchOneStart),

    // call(getServerTimeStart),
    // call(cancelStart),
    // call(rejectStart),
  ]);
}
