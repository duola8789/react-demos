/**
 * Created By zh on 2019-03-19
 */
import React, { Fragment, useState, useEffect } from 'react';
import { Button, Checkbox, Input } from 'antd';
import db from '@/db';
import style from './index.module.css';

const TodoItem = ({ item, changeTodoItem, deleteTodoItem }) => {
  return (
    <li className={style.todoItem}>
      <Checkbox checked={item.done} onChange={() => changeTodoItem({ ...item, done: !item.done })} />
      <span>{item.content}</span>
      <span>{new Date(item.updatedTime).toLocaleString()}</span>
      <Button icon="delete" type="danger" onClick={() => deleteTodoItem(item.id)}>
        删除
      </Button>
    </li>
  );
};

export default function DexieTodoList() {
  const [content, setContent] = useState('');
  const [items, setItems] = useState([]);

  const getItemsFromDb = async () => {
    const newItems = await db.items.toArray();
    setItems(
      newItems.map((v) => ({
        id: v.id,
        content: v.content,
        done: v.done,
        updatedTime: v.updatedTime
      }))
    );
  };

  useEffect(() => {
    getItemsFromDb();
  }, []);

  const onConfirm = async (e) => {
    if (e.keyCode === 13) {
      await addItem();
    }
  };

  const addItem = async () => {
    const newItem = {
      content,
      done: false,
      updatedTime: Date.now()
    };
    setItems([...items, newItem]);
    await db.items.add(newItem);
  };

  const delItem = async (id) => {
    const newItems = items.filter((v) => v.id !== id);
    setItems(newItems);
    await db.items.delete(id);
  };

  const updateItem = async (item) => {
    const targetIndex = items.findIndex((v) => v.id === item.id);
    debugger;
    if (targetIndex > -1) {
      const newItems = [...items.slice(0, targetIndex), item, ...items.slice(targetIndex + 1)];
      setItems(newItems);
      await db.items.update(item.id, item);
    }
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <label>
        <Input
          value={content}
          placeholder="请输入新的待办事项"
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onConfirm}
        />
        <ul className={style.todoList}>
          {items.map((v) => (
            <TodoItem key={v.id} item={v} changeTodoItem={updateItem} deleteTodoItem={delItem} />
          ))}
        </ul>
      </label>
    </Fragment>
  );
}
