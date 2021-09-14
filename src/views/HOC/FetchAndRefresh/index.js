/**
 * Created By zh on 2019-03-19
 *
 */
// 取数据和点击刷新的功能
import React, { Component } from 'react';
import Api from '@/network/api';
import { loadAndRefreshHOC, logPropsHOC } from '../HOC';

const Post = ({ contents, src, refresh }) => (
  <div>
    <p>{contents}</p>
    <button onClick={() => refresh()}>刷新</button>
    <div>
      <img src={src} alt="" />
    </div>
  </div>
);

const NewPost = logPropsHOC(loadAndRefreshHOC(Api.yesOrNoApi)(Post));

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  render() {
    return <NewPost />;
  }
}
