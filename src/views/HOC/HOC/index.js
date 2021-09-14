/**
 * Created By zh on 2019-03-19
 */
import React, { Component } from 'react';
import { get } from '../../../network/helpers';

// 为组件添加获取数据和点击刷新的功能
const loadAndRefreshHOC = (url) => (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        contents: '',
        src: '',
        loading: false
      };
    }

    componentDidMount() {
      this.refresh();
    }

    async refresh() {
      this.setState({
        contents: 'Loading...',
        loading: true
      });
      console.log('fetch data start');
      const res = await get(url);
      this.setState({
        contents: res.answer,
        src: res.image,
        loading: false
      });
      console.log('fetch data success');
    }

    render() {
      // 可以再外部展示Loading状态，也可以通过contents传入组件内部展示
      // 哪一种好？不确定，不知道
      if (this.state.loading) {
        return <div>Loading!!!!!!!</div>;
      }
      return (
        <WrappedComponent
          contents={this.state.contents}
          src={this.state.src}
          refresh={() => this.refresh()}
          {...this.props}
        ></WrappedComponent>
      );
    }
  };
};

// 用来监控父级组件传入的Props的改变
const logPropsHOC = (WrappedComponent) => {
  return class extends Component {
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      console.log(`WrappedComponent: ${WrappedComponent.displayName}, Current props: `, this.props);
      console.log(`WrappedComponent: ${WrappedComponent.displayName}, Next props: `, nextProps);
      console.log('%c-----------------------------', 'color: red');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

// 获取鼠标位置
const showMousePosHoc = (WrappedComponent) => {
  return class extends Component {
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
        <div onMouseMove={(e) => this.handleMouseMove(e)}>
          <WrappedComponent {...this.props} pos={this.state} />
        </div>
      );
    }
  };
};

export { loadAndRefreshHOC, logPropsHOC, showMousePosHoc };
