import {takeLatest, put, all, call} from 'redux-saga/effects';
import Therapist, {BaseTherapist} from '../../interfaces/Therapist';
import {FetchProfileStart} from './actionTypes';
import ACTION_STRINGS from './actionStrings';
import {processError} from '../utils';
import {
  fetchErrorAction,
  fetchProfileErrorAction,
  fetchProfileSuccessAction,
  fetchSuccessAction,
} from './actions';
import {therapistAPI} from '../../resources/api';

function* fetchStartAsync(): Generator<unknown, void, BaseTherapist[]> {
  try {
    const res = yield therapistAPI.getAll();
    yield put(fetchSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchErrorAction(message));
  }
}

function* fetchStart() {
  yield takeLatest(ACTION_STRINGS.FETCH_START, fetchStartAsync);
}

function* fetchProfileStartAsync({
  payload,
}: FetchProfileStart): Generator<unknown, void, Therapist> {
  try {
    const res = yield therapistAPI.getOne(payload);
    yield put(fetchProfileSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(fetchProfileErrorAction(message));
  }
}

function* fetchProfileStart() {
  yield takeLatest(ACTION_STRINGS.FETCH_PROFILE_START, fetchProfileStartAsync);
}

export default function* sagas() {
  yield all([call(fetchStart), call(fetchProfileStart)]);
}
