/**
 * Created By zh on 2019-03-19
 */
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case 'reset': {
      return initialState;
    }
    case 'increment': {
      return { count: state.count + 1 };
    }
    case 'decrement': {
      return { count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
}

export default function() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
