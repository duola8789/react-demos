/**
 * Created by zh on 2019/12/20.
 */
import React, { Fragment, useEffect, useState } from 'react';
import store from '@/store';
import actions from '@/store/actions/actions';
import { Button, Input, Spin, Checkbox } from 'antd';
import style from './index.module.css';

const TodoHead = ({ count, addTodoItem }) => {
  const getHintText = (count) => {
    if (!count) {
      return '你没有待办事项，快去添加吧！';
    }
    return `你有${count}个待办事项，快去处理吧！`;
  };
  return (
    <Fragment>
      <p className={style.title}>待办清单</p>
      <p className={style.title}>{getHintText(count)}</p>
      <div className={style.inputContainer}>
        <Input style={{ width: 200 }} placeholder="添加待办事项" onPressEnter={(e) => addTodoItem(e.target.value)} />
      </div>
    </Fragment>
  );
};

const TodoItem = ({ item, deleteTodoItem, changeTodoItem }) => {
  return (
    <li className={style.item}>
      <div className={style.checkbox}>
        <Checkbox
          checked={item.done}
          className={style.checkbox}
          onChange={() => changeTodoItem({ ...item, done: !item.done })}
        ></Checkbox>
      </div>
      <Input
        value={item.content}
        style={{ width: 200, marginRight: 20 }}
        onInput={(e) => changeTodoItem({ ...item, content: e.target.value })}
      />
      <Button icon="delete" type="danger" onClick={() => deleteTodoItem(item.id)}>
        删除
      </Button>
    </li>
  );
};

export default function Todo() {
  const [list, setList] = useState(store.getState().sagaTodo.list);
  const [count, setCount] = useState(store.getState().sagaTodo.count);
  const [loading, setLoading] = useState(store.getState().sagaTodo.loading);

  const addTodoItem = (content) => {
    if (!content) {
      return;
    }
    store.dispatch(actions.sagaTodo.addItem(content));
  };

  const deleteTodoItem = (id) => store.dispatch(actions.sagaTodo.deleteItem(id));

  const changeTodoItem = (item) => store.dispatch(actions.sagaTodo.changeItem(item));

  const unsubscribe = store.subscribe(() => {
    setLoading(store.getState().sagaTodo.loading);
    setList(store.getState().sagaTodo.list);
    setCount(store.getState().sagaTodo.count);
  });

  useEffect(() => {
    return unsubscribe;
  });

  return (
    <Spin spinning={loading}>
      <div className={style.container}>
        <TodoHead count={count} addTodoItem={addTodoItem} />
        <ul className={style.listContainer}>
          {list.map((item) => (
            <TodoItem key={item.id} item={item} deleteTodoItem={deleteTodoItem} changeTodoItem={changeTodoItem} />
          ))}
        </ul>
      </div>
    </Spin>
  );
}
