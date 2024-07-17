import {takeLatest, put, all, call} from 'redux-saga/effects';
import {processError} from '../utils';
import {fetchErrorAction, fetchSuccessAction} from './actions';
import ACTION_STRINGS from './actionStrings';
import Category from '../../interfaces/Category';
import {categoriesAPI} from '../../resources/api';

function* fetchStartAsync(): Generator<unknown, void, Category[]> {
  try {
    const res = yield categoriesAPI.getAll();
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

export default function* sagas() {
  yield all([call(fetchStart)]);
}
