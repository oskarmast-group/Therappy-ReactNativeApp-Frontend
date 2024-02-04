import {takeLatest, put, all, call} from 'redux-saga/effects';
import {
  deleteErrorAction,
  deleteSuccessAction,
  fetchErrorAction,
  fetchSuccessAction,
  newDocErrorAction,
  newDocSuccessAction,
  updateErrorAction,
  updateSuccessAction,
} from './actions';
import {processError} from '../utils';
import ACTION_STRINGS from './actionStrings';
import RequiredDocumentation from '../../interfaces/Documentation/RequiredDocumentation';
import {documentationAPI, requiredDocumentationAPI} from '../../resources/api';
import {toFormData} from '../../utils';
import {DeleteStart, NewDocStart, UpdateStart} from './actionTypes';
import Documentation from '../../interfaces/Documentation';
import {
  addDocumentationAction,
  deleteDocumentationAction,
  updateDocumentationAction,
} from '../user/actions';

function* fetchStartAsync(): Generator<unknown, void, RequiredDocumentation[]> {
  try {
    const res = yield requiredDocumentationAPI.getAll();
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

function* newDocStartAsync({
  payload,
}: NewDocStart): Generator<unknown, void, Documentation> {
  try {
    const form = toFormData(payload);
    const res = yield documentationAPI.uploadDocument(form);
    yield put(newDocSuccessAction(res));
    yield put(addDocumentationAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(newDocErrorAction(message));
  }
}

function* newDocStart() {
  yield takeLatest(ACTION_STRINGS.NEW_DOC_START, newDocStartAsync);
}

function* updateStartAsync({
  payload,
}: UpdateStart): Generator<unknown, void, Documentation> {
  try {
    const form = toFormData(payload);
    const res = yield documentationAPI.updateDocument(form);
    yield put(updateSuccessAction(res));
    yield put(updateDocumentationAction({uuid: payload.uuid, document: res}));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(updateErrorAction(message));
  }
}

function* updateStart() {
  yield takeLatest(ACTION_STRINGS.UPDATE_START, updateStartAsync);
}

function* deleteStartAsync({
  payload,
}: DeleteStart): Generator<unknown, void, Documentation> {
  try {
    const res = yield documentationAPI.deleteDocument(payload);
    yield put(deleteSuccessAction(res));
    yield put(deleteDocumentationAction(payload));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(deleteErrorAction(message));
  }
}

function* deleteStart() {
  yield takeLatest(ACTION_STRINGS.DELETE_START, deleteStartAsync);
}

export default function* sagas() {
  yield all([
    call(fetchStart),
    call(newDocStart),
    call(updateStart),
    call(deleteStart),
  ]);
}
