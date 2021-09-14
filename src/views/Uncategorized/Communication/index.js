/**
 * Created By zh on 2019-07-12
 */
import React, { useState, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import store from '@/store/';
import style from './index.module.css';
import { event3 as event } from '@/utils';

// 初始化一个 Context
const Context = React.createContext();

const Child1 = (props) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      event.emit('msg', 'Message from Child1');
    }, 3000);
    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, []);

  return (
    <div className={style['child-container']}>
      <h4 onClick={() => props.changeMsg('By Child1')}>Child1 -- {props.msg}</h4>
      <Grandson1 {...props} />
    </div>
  );
};

const Grandson1 = (props) => {
  return (
    <div className={style['grandson-container']}>
      <h5 onClick={() => props.changeMsg('By Grandson1')}>Grandson1 -- {props.msg}</h5>
    </div>
  );
};

const mapStateToProps = (state) => ({ rootMsg: state.reducer14.msg });
const mapDispatchToProps = { changeMsg: (where) => ({ type: 'changeMsg', payload: { where } }) };

const Grandson2 = ({ rootMsg, changeMsg }) => {
  return (
    <div className={style['grandson-container']}>
      <h5 onClick={() => changeMsg('Grandson1')}>Grandson1 -- {rootMsg}</h5>
    </div>
  );
};

const Grandson2Container = connect(mapStateToProps, mapDispatchToProps)(Grandson2);

const Child2 = () => {
  const [msg, setMsg] = useState('Child2');

  useEffect(() => {
    event.on('msg', (newMsg) => setMsg(newMsg));
    return () => {
      event.off('msg');
    };
  }, []);

  return (
    <div className={style['child-container']}>
      <h4>Child2 -- {msg}</h4>
      <Grandson2Container />
    </div>
  );
};

const Grandson3 = () => {
  return (
    <Context.Consumer>
      {(context) => (
        <div className={style['grandson-container']}>
          <h5 onClick={() => context.changeMsg('By Grandson3')}>Grandson3 -- {context.msgToGrand3}</h5>
        </div>
      )}
    </Context.Consumer>
  );
};

const Child3 = () => {
  const [msg] = useState('Child3');

  return (
    <div className={style['child-container']}>
      <h4>Child3 -- {msg}</h4>
      <Grandson3 />
    </div>
  );
};

const Parent = () => {
  const [msg, setMsg] = useState('start');

  useEffect(() => {
    let timer = setTimeout(() => {
      setMsg('end');
    }, 2000);
    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, []);

  return (
    <Context.Provider
      value={{
        msgToGrand3: msg,
        changeMsg: setMsg
      }}
    >
      <div className={style['parent-container']}>
        <h3>Parent -- {msg}</h3>
        <Child1 msg={msg} changeMsg={(newMsg) => setMsg(newMsg)} />
        <Child2 />
        <Child3 />
      </div>
    </Context.Provider>
  );
};

const Demo14 = ({ rootMsg, changeMsg }) => {
  return (
    <div>
      <h2 onClick={() => changeMsg('Root')}>Demo14 -- 组件间通信 -- {rootMsg} </h2>
      <Parent />
    </div>
  );
};

const Demo14Container = connect(mapStateToProps, mapDispatchToProps)(Demo14);

export default function() {
  return (
    <Provider store={store}>
      <Demo14Container />
    </Provider>
  );
}
