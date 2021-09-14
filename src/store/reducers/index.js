/**
 * Created by zh on 2019/3/4.
 */
import { combineReducers } from 'redux';
import actionTypes from '@/store/actions/actionTypes';

import defaultImage from '../../assets/images/default.jpg';

const reducer1 = (state = 0, action) => {
  // console.log('reducer1 was called with state', state, 'and action', action);
  switch (action.type) {
    case 'INCREMENT': {
      return Number(state) + 1;
    }
    case 'DECREMENT': {
      return Number(state) - 1;
    }
    case 'CHANGE': {
      return Number(action.payload);
    }
    default: {
      return Number(state);
    }
  }
};

const reducer3 = function(state = { status: '', answer: { msg: '', image: defaultImage } }, action) {
  // console.log('reducer_3 was called with state', state, 'and action', action);
  switch (action.type) {
    case 'SAY_SOMETHING': {
      return {
        ...state,
        message: action.value
      };
    }
    case 'SEND_QUESTION': {
      return {
        ...state,
        status: action.status,
        question: action.question
      };
    }
    case 'RECEIVE_ANSWER': {
      return {
        ...state,
        status: action.payload ? action.payload.status : action.status,
        answer: action.payload ? action.payload.answer : action.answer
      };
    }
    default:
      return state;
  }
};

const reducer4 = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + 1
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - 1
      };
    }
    default: {
      return state;
    }
  }
};

const reducer14 = (state = { msg: 'Hello' }, action) => {
  switch (action.type) {
    case 'changeMsg': {
      return {
        msg: 'By Redux From ' + action.payload.where
      };
    }
    default: {
      return state;
    }
  }
};

const sagaAnswer = (state = { question: '', answer: '', image: '', loading: false }, action) => {
  switch (action.type) {
    case 'ASK': {
      return {
        question: action.payload.question,
        answer: '',
        image: '',
        loading: false
      };
    }
    case 'ASK_QUESTION_SUCCEEDED': {
      return {
        ...state,
        answer: action.payload.answer,
        image: action.payload.image,
        loading: false
      };
    }
    case 'ASK_QUESTION_FAILED': {
      return {
        ...state,
        answer: action.payload.message,
        image: '',
        loading: false
      };
    }
    case 'THINKING': {
      return {
        ...state,
        answer: 'Thinking...',
        image: '',
        loading: true
      };
    }
    default: {
      return state;
    }
  }
};

const sagaCount = (state = { count: 0, loading: false }, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + 1,
        loading: false
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count - 1,
        loading: false
      };
    }
    case 'ASYNC_LOADING': {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
};

const sagaTodo = (state = { list: [], loading: false }, action) => {
  const actionType = actionTypes.sagaTodo;
  switch (action.type) {
    case actionType.UPDATE_LIST: {
      return {
        loading: false,
        list: action.payload.list,
        count: action.payload.count
      };
    }
    case actionType.CHANGE_LOADING: {
      return {
        ...state,
        loading: action.payload.loading
      };
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  val1: reducer1,
  val3: reducer3,
  val4: reducer4,
  reducer14,
  sagaAnswer,
  sagaCount,
  sagaTodo
});

export default reducer;

/**
 * createStore的简单实现
 * @param reducer
 * @returns {{getState: (function(): *), dispatch: dispatch, subscribe: (function(*=): Function)}}
 const createStore = reducer => {
  let state = reducer(undefined, {});
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    reducer(state, action);
    listeners.forEach(fn => {
      fn()
    })
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners.filter(fn => fn !== listener)
    }
  };

  return {
    getState,
    dispatch,
    subscribe
  }
};
 */

/**
 * combineReducer的简单实现
 * @param reducers
 * @returns {Function}
 const combineReducer = reducers => (state = {}, action) => {
  Object.keys(reducers).reduce((newState, key) => {
    newState[key] = reducers[key](state[key], action);
    return newState
  }, {})
}
 */
