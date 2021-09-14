/**
 * Created By zh on 2019-03-19
 */
import React, { Component, useState, useEffect } from 'react';

/**
 * 一个简单的计数器的组件，传统的写法：
 * 实现的功能
 * 1. 点击按钮计数器增加
 * 2. 随着计数器增加，网页的标题发生改变
 */
class Count extends Component {
  state = { count: 0 };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click Me</button>
      </div>
    );
  }
}

//
/**
 * 上面的组件改用
 * @returns {*}
 * @constructor
 */
const CountHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      document.title = 'ok';
    };
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
};

export default class Demo8 extends Component {
  state = { count: 0 };

  render() {
    return (
      <div>
        <Count />
        <CountHook />
      </div>
    );
  }
}
