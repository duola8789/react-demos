/**
 * Created by zh on 2019/12/18.
 */
import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import Request from '@/network/request';
import { delay } from '@/utils';
import todoFlows from '@/sagas/todoSaga';

// worker Saga：一个用来执行异步操作的 Generator 函数
export function* fetchAnswerAsync(action) {
  try {
    yield put({ type: 'THINKING' });
    const { answer, image } = yield call(Request.getAnswer, { question: action.payload.question });
    yield put({ type: 'ASK_QUESTION_SUCCEEDED', payload: { answer, image } });
  } catch (e) {
    yield put({ type: 'ASK_QUESTION_FAILED', payload: { message: e.message } });
  }
}

function* watchFetchAnswer() {
  // 在每个 FETCH_ANSWER_REQUESTED 的 action 被 dispatch 时都会调用 fetchAnswerAsync
  yield takeEvery('FETCH_ANSWER_REQUESTED', fetchAnswerAsync);

  // 也可以使用 takeLatest，它不允许并发
  // 如果在这之前已经有一个 FETCH_ANSWER_REQUESTED 的 action 在处理中
  // 那么处理中的 action 会被取消，执行当前的 action

  // yield takeLatest('FETCH_ANSWER_REQUESTED', fetchAnswerAsync);
}

// eslint-disable-next-line require-yield
function* helloSaga() {
  console.log('Hello Sagas!');
}

// worker Sage: 执行异步的 increment 任务，在 delay 结束后出发同步的 action
export function* incrementAsync(action) {
  yield put({ type: 'ASYNC_LOADING' });
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

// watcher Saga: 在每个 INCREMENT_ASYNC 的 action 被 dispatch 时调用 worker Saga
export function* watchIncrementAsync() {
  yield takeLatest('INCREMENT_ASYNC', incrementAsync);
}

export default function* root() {
  yield all([helloSaga(), watchIncrementAsync(), watchFetchAnswer(), todoFlows()]);
}
