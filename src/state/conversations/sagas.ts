import { takeLatest, put, all, call } from 'redux-saga/effects';
import Conversation, { BaseConversation } from '../../interfaces/Conversation';
import { fetchErrorAction, fetchOneErrorAction, fetchOneSuccessAction, fetchSuccessAction } from './actions';
import { processError } from '../utils';
import ACTION_STRINGS from './actionStrings';
import { FetchOneStart } from './actionTypes';
import { conversationsAPI } from '../../resources/api';

function* fetchStartAsync(): Generator<unknown, void, Conversation[]> {
  try {
    const res = yield conversationsAPI.getAll();
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

function* fetchOneStartAsync({ payload }: FetchOneStart): Generator<unknown, void, BaseConversation> {
  try {
    const res = yield conversationsAPI.view(payload);
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

export default function* sagas() {
  yield all([call(fetchStart), call(fetchOneStart)]);
}
