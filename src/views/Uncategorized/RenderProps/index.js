/**
 * Created By zh on 2019-03-19
 */
import React, { Component } from 'react';

class ShowMousePos extends Component {
  state = {
    x: 0,
    y: 0
  };

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  }

  render() {
    return (
      <div onMouseMove={(e) => this.handleMouseMove(e)} style={{ height: '60vh', border: '1px solid grey' }}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

const AppWithMouse = () => (
  <div>
    <ShowMousePos
      render={({ x, y }) => (
        <h1>
          The position of mouse is ({x}, {y})
        </h1>
      )}
    />
  </div>
);

export default class Demo5 extends Component {
  render() {
    return <AppWithMouse />;
  }
}
