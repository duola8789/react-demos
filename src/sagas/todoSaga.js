/**
 * Created by zh on 2019/12/20.
 */
import { call, put, all, select, take } from 'redux-saga/effects';
import { delay } from '@/utils';
import actionTypes from '@/store/actions/actionTypes';

const actionType = actionTypes.sagaTodo;
export function* addTodoItemFlow() {
  while (true) {
    const {
      payload: { content }
    } = yield take(actionType.ADD_ITEM);
    yield put({ type: actionType.CHANGE_LOADING, payload: { loading: true } });
    yield call(delay, 500);
    const oldList = yield select((state) => state.sagaTodo.list);
    const item = { content, id: oldList.length, done: false };
    const list = [...oldList, item];
    const count = list.filter((v) => !v.done).length;
    yield put({ type: actionType.UPDATE_LIST, payload: { list, count } });
    yield put({ type: actionType.CHANGE_LOADING, payload: { loading: false } });
  }
}

export function* deleteTodoItemFlow() {
  const actionType = actionTypes.sagaTodo;
  while (true) {
    const {
      payload: { id }
    } = yield take(actionType.DELETE_ITEM);
    yield put({ type: actionType.CHANGE_LOADING, payload: { loading: true } });
    yield call(delay, 500);
    const oldList = yield select((state) => state.sagaTodo.list);
    const list = oldList.filter((v) => v.id !== id);
    const count = list.filter((v) => !v.done).length;
    yield put({ type: actionType.UPDATE_LIST, payload: { list, count } });
    yield put({ type: actionType.CHANGE_LOADING, payload: { loading: false } });
  }
}

export function* changeTodoItemFlow() {
  const actionType = actionTypes.sagaTodo;
  while (true) {
    const { payload: item } = yield take(actionType.CHANGE_ITEM);
    yield put({ type: actionType.CHANGE_LOADING, payload: { loading: true } });
    yield call(delay, 10);
    const oldList = yield select((state) => state.sagaTodo.list);
    const list = oldList.map((v) => {
      if (v.id === item.id) {
        return {
          ...item
        };
      }
      return v;
    });
    const count = list.filter((v) => !v.done).length;
    yield put({ type: actionType.UPDATE_LIST, payload: { list, count } });
    yield put({ type: actionType.CHANGE_LOADING, payload: { loading: false } });
  }
}

export default function* todoFlows() {
  yield all([addTodoItemFlow(), deleteTodoItemFlow(), changeTodoItemFlow()]);
}
