/**
 * Created by zh on 2019/3/1.
 */
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import store from '@/store/';

const Count = ({ value, onIncreaseClick, onDecreaseClick }) => (
  <div>
    <button onClick={onIncreaseClick}> +</button>
    <span>Now, the count is {value}</span>
    <button onClick={onDecreaseClick}> -</button>
  </div>
);

const mapStateToProps = (state) => ({ value: state.val4.count });

// 函数形式
// const mapDispatchToProps = (dispatch) => ({
//   onIncreaseClick: () => dispatch({ type: 'INCREMENT' }),
//   onDecreaseClick: () => dispatch({ type: 'DECREMENT' }),
// });

// 对象形式
const mapDispatchToProps = {
  onIncreaseClick: () => {
    console.log();
    return { type: 'INCREMENT' };
  },
  onDecreaseClick: () => ({ type: 'DECREMENT' })
};

const CountContainer = connect(mapStateToProps, mapDispatchToProps)(Count);

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <CountContainer />
      </Provider>
    );
  }
}
