/**
 * Created by zh on 2019/3/1.
 */
import React, { Component } from 'react';
import store from '../../../store';

const Count = ({ value, onIncrement, onDecrement, onChange }) => {
  return (
    <div>
      <button onClick={onIncrement}> +</button>
      <span>Now, the count is {value}</span>
      <button onClick={onDecrement}> -</button>
      <input type="number" onInput={onChange} />
    </div>
  );
};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: store.getState().val1
    };
  }

  render() {
    const value = this.state.val1;

    const ACTIONS = {
      INCREMENT: 'INCREMENT',
      DECREMENT: 'DECREMENT',
      CHANGE: 'CHANGE'
    };

    store.subscribe(() => {
      this.setState({
        val1: store.getState().val1
      });
    });

    return (
      <Count
        value={value}
        onIncrement={() => store.dispatch({ type: ACTIONS.INCREMENT })}
        onDecrement={() => store.dispatch({ type: ACTIONS.DECREMENT })}
        onChange={(e) =>
          store.dispatch({
            type: ACTIONS.CHANGE,
            payload: e.target.value
          })
        }
      ></Count>
    );
  }
}
