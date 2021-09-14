/**
 * Created By zh on 2019-03-19
 */
import React, { Component } from 'react';

// 初始化一个Context
const Context = React.createContext();

const Grandson = () => (
  <Context.Consumer>
    {(context) => (
      <div style={{ border: '1px solid #fff', width: '50%', margin: '0 auto' }}>
        <h3>这是孙子</h3>
        <p>老子给的数：{context.count}</p>
      </div>
    )}
  </Context.Consumer>
);

class Child extends Component {
  render() {
    return (
      <div style={{ border: '1px solid #fff', width: '50%', margin: '0 auto' }}>
        <h2>这是儿子</h2>
        <Grandson />
      </div>
    );
  }
}

export default class Demo7 extends Component {
  state = { count: 0 };

  render() {
    return (
      <Context.Provider value={{ count: this.state.count }}>
        <div style={{ border: '1px solid #fff' }}>
          <h1>这是老子</h1>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}> +</button>
          <button onClick={() => this.setState({ count: this.state.count - 1 })}> -</button>
          <Child />
        </div>
      </Context.Provider>
    );
  }
}
