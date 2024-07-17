import {
  takeLatest,
  put,
  all,
  call,
  takeEvery,
  select,
} from 'redux-saga/effects';
import conversationSelector from '../conversations/selector';
import messagesSelector from './selector';
import userSelector from '../user/selector';
import {
  fetchErrorAction,
  fetchSuccessAction,
  markAsReadErrorAction,
  markAsReadSuccessAction,
  sendMessageErrorAction,
  sendMessageSuccessAction,
} from './actions';
import ConversationState from '../conversations/state';
import MessagesState from './state';
import {messagesAPI} from '../../resources/api';
import Message from '../../interfaces/Conversation/Message';
import {processError} from '../utils';
import ACTION_STRINGS from './actionStrings';
import {SendMessageStart} from './actionTypes';
import UserState from '../user/state';

function* fetchStartAsync(): Generator<
  unknown,
  void,
  ConversationState | MessagesState | Message[]
> {
  try {
    const conversationState: ConversationState = (yield select(
      conversationSelector,
    )) as ConversationState;

    const messagesState: MessagesState = (yield select(
      messagesSelector,
    )) as MessagesState;

    if (!conversationState.conversation?.uuid) {
      throw Error('Unknown');
    }
    const res = (yield messagesAPI.view(
      conversationState.conversation.uuid,
      messagesState.extraMessagesToFetch,
    )) as Message[];

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

function* sendMessageStartAsync({
  payload,
}: SendMessageStart): Generator<unknown, void, ConversationState | Message> {
  try {
    const conversationState = (yield select(
      conversationSelector,
    )) as ConversationState;

    if (!conversationState.conversation?.uuid) {
      throw Error('Unknown');
    }

    const res = (yield messagesAPI.send(
      {...payload},
      conversationState.conversation.uuid,
    )) as Message;
    yield put(sendMessageSuccessAction(res));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(sendMessageErrorAction(message));
  }
}

function* sendMessageStart() {
  yield takeEvery(ACTION_STRINGS.SEND_MESSAGE_START, sendMessageStartAsync);
}

function* markAsReadStartAsync(): Generator<
  unknown,
  void,
  MessagesState | UserState
> {
  try {
    const messagesState = (yield select(messagesSelector)) as MessagesState;
    const userState = (yield select(userSelector)) as UserState;

    const toMark = messagesState.list
      .filter(
        msg => userState.current?.id !== msg.from.id && !msg.readTimestamp,
      )
      .map(({uuid}) => uuid);

    const alreadyMarked = new Set(messagesState.markedAsRead);

    let messages = [];
    for (const msg of toMark) {
      if (!alreadyMarked.has(msg)) {
        messages.push(msg);
      }
    }
    if (messages.length > 0) {
      yield messagesAPI.markAsRead(messages);
    }
    yield put(markAsReadSuccessAction(messages));
  } catch (error) {
    const message = processError(error);
    console.error(message);
    yield put(markAsReadErrorAction(message));
  }
}

function* markAsReadStart() {
  yield takeLatest(ACTION_STRINGS.MARK_AS_READ_START, markAsReadStartAsync);
}

export default function* sagas() {
  yield all([call(fetchStart), call(sendMessageStart), call(markAsReadStart)]);
}
