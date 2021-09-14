/**
 * Created By zh on 2019-07-12
 */
import React from 'react';

class Test extends React.Component {
  state = {
    y: 999
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.y) {
      return {
        y: props.value
      };
    }
    return null;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      y: 81
    });
    console.log(this.state.y, 123);
  }

  render() {
    if (this.state.y === 999) {
      throw new Error('33333');
    }
    return <h1>{this.state.y}</h1>;
  }
}

export default class Index extends React.Component {
  state = {
    x: 1223
  };

  test = () => {
    this.setState({
      x: 999
    });
  };

  render() {
    return (
      <div onClick={this.test}>
        <Test value={this.state.x} />
      </div>
    );
  }
}
