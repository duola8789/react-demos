/**
 * Created by zh on 2019/12/19.
 */
import { incrementAsync, fetchAnswerAsync } from '@/sagas';
import Request from '@/network/request';
import { put, call } from 'redux-saga/effects';
import { delay } from '@/utils';

describe('incrementAsync Saga test ', () => {
  const gen = incrementAsync();
  expect(gen.next()).toEqual({ done: false, value: put({ type: 'ASYNC_LOADING' }) });
  expect(gen.next()).toEqual({ done: false, value: call(delay, 1000) });
  expect(gen.next()).toEqual({ done: false, value: put({ type: 'INCREMENT' }) });
  expect(gen.next()).toEqual({ done: true });
});

describe('fetchAnswerAsync Saga test ', () => {
  it('fetch succeed', () => {
    const gen = fetchAnswerAsync({ payload: { question: 'hello' } });
    expect(gen.next()).toEqual({ done: false, value: put({ type: 'THINKING' }) });
    expect(gen.next()).toEqual({ done: false, value: call(Request.getAnswer, { question: 'hello' }) });
    // mock success response
    const res = { answer: 'saga', image: 'ok' };
    expect(gen.next(res)).toEqual({
      done: false,
      value: put({
        type: 'ASK_QUESTION_SUCCEEDED',
        payload: res
      })
    });
    expect(gen.next()).toEqual({ done: true });
  });

  it('fetch fail', () => {
    const gen = fetchAnswerAsync({ payload: { question: 'hello' } });
    expect(gen.next()).toEqual({ done: false, value: put({ type: 'THINKING' }) });
    expect(gen.next()).toEqual({ done: false, value: call(Request.getAnswer, { question: 'hello' }) });
    // mock error response
    const error = { message: 'something wrong...' };
    expect(gen.throw(error)).toEqual({
      done: false,
      value: put({
        type: 'ASK_QUESTION_FAILED',
        payload: error
      })
    });
    expect(gen.next()).toEqual({ done: true });
  });
});
