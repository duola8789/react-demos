/**
 * Created By zh on 2019-03-19
 */
import React, { Component } from 'react';
import { showMousePosHoc } from '../HOC';

const Base = ({ pos }) => {
  const { x, y } = pos;
  return (
    <div>
      <h1>
        The position of mouse is ({x}, {y})
      </h1>
    </div>
  );
};

const AppWithMouse = showMousePosHoc(Base);

// @showMousePosHoc
// class Base extends Component {
//   render() {
//     return (
//       <div>
//         <h1>The position of mouse is ({this.props.pos.x}, {this.props.pos.y})</h1>
//       </div>
//     );
//   }
// }

export default class index extends Component {
  render() {
    return <AppWithMouse />;
  }
}
