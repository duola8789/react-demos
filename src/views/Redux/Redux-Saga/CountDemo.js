/**
 * Created by zh on 2019/3/1.
 */
import React, { Fragment, useEffect, useState } from 'react';
import store from '../../../store';
import style from './index.module.css';

import { Input, Button } from 'antd';
import Image from '@/components/Image';
import TodoList from '@/views/Redux/Redux-Saga/TodoList/index';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, loading }) => {
  return (
    <div>
      <h1>Clicked: {value} times</h1>
      <Button onClick={onIncrement} className={style.countButton}>
        Increment
      </Button>
      <Button onClick={onDecrement} className={style.countButton}>
        Decrement
      </Button>
      <Button onClick={onIncrementAsync} className={style.countButton} loading={loading}>
        Increment after 1 second
      </Button>
    </div>
  );
};

const FetchAnswer = () => {
  const [question, setQuestion] = useState(store.getState().sagaAnswer.question);
  const [answer, setAnswer] = useState(store.getState().sagaAnswer.answer);
  const [image, setImage] = useState(store.getState().sagaAnswer.image);
  const [loading, setLoading] = useState(store.getState().sagaAnswer.loading);

  const unsubscribe = store.subscribe(() => {
    setQuestion(store.getState().sagaAnswer.question);
    setAnswer(store.getState().sagaAnswer.answer);
    setImage(store.getState().sagaAnswer.image);
    setLoading(store.getState().sagaAnswer.loading);
  });

  useEffect(() => {
    return unsubscribe;
  });

  return (
    <Fragment>
      <Input.Search
        placeholder="Your question is ..."
        onChange={(e) => store.dispatch({ type: 'ASK', payload: { question: e.target.value } })}
        onSearch={(value) => store.dispatch({ type: 'FETCH_ANSWER_REQUESTED', payload: { question: value } })}
        style={{ width: 200 }}
      ></Input.Search>
      <p className={style.question}>Your question is: {question}</p>
      <p>The answer is: {answer}</p>
      <div className={style.imageContainer}>
        <Image image={image} fetching={loading} />
      </div>
    </Fragment>
  );
};

export default function ReduxSaga() {
  const [count, setCount] = useState(store.getState().sagaCount.count);
  const [loading, setLoading] = useState(store.getState().sagaCount.loading);

  const unsubscribe = store.subscribe(() => {
    setCount(store.getState().sagaCount.count);
    setLoading(store.getState().sagaCount.loading);
  });

  useEffect(() => {
    return unsubscribe;
  });

  return (
    <div>
      <Counter
        value={count}
        loading={loading}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        onIncrementAsync={() => store.dispatch({ type: 'INCREMENT_ASYNC' })}
      ></Counter>
      <div className={style.demoContainer}>
        <FetchAnswer fetchAnswer={() => store.dispatch({ type: 'ASK_QUESTION_REQUESTED' })} />
      </div>
      <div className={style.demoContainer}>
        <TodoList />
      </div>
    </div>
  );
}
