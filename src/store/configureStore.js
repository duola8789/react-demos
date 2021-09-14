/**
 * Created by zh on 2019/12/18.
 */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

// 使用 thunk 中间件，使 dispatch 可以接受函数作为参数（默认只能接受 Action 对象作为参数）
// import thunk from 'redux-thunk';

// 使用 redux-promise 中间件，使 dispatch 可以接受 Promise 作为参数
// import promiseMiddleware from 'redux-promise';

// 使用 redux-saga 中间件
import createSagaMiddleware from 'redux-saga';

// 自定义的 log 中间件
const logMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log('logMiddleware action received: ', action);
  return next(action);
};

export default function configureStore() {
  // 创建 redux-saga 中间件
  const sagaMiddleware = createSagaMiddleware();
  return {
    // 创建 Store，并注入中间件
    ...createStore(rootReducer, applyMiddleware(logMiddleware, sagaMiddleware)),
    runSaga: sagaMiddleware.run
  };
}
