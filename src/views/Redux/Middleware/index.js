/**
 * Created by zh on 2019/3/1.
 */
import React, { Component } from 'react';
import style from './index.module.css';
import store from '../../../store';

import { createAction } from 'redux-actions';

import Request from '../../../network/request';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: store.getState().val3.status,
      answer: store.getState().val3.answer,
      question: store.getState().val3.question,
      questionInput: ''
    };
    this._isMounted = true;
  }

  // 使用redux-thunk中间件解决异步操作
  // sendQuestion() {
  //   const question = this.state.questionInput;
  //
  //   // Action Creator1
  //   const requestPost = (question) => ({ type: 'SEND_QUESTION', status: 'sending...', question });
  //
  //   // Action Creator2
  //   const receivePost = (answer) => ({
  //     type: 'RECEIVE_ANSWER',
  //     status: '',
  //     answer
  //   });
  //
  //   const actionCreator = () => (dispatch, getState) => {
  //     dispatch(requestPost(question));
  //     // 重置输入框
  //     this.setState({
  //       questionInput: ''
  //     });
  //     return Request.getAnswer({ question })
  //       .then(res => dispatch(receivePost(res)))
  //   };
  //
  //   store.dispatch(actionCreator());
  // }

  // 使用redux-promise中间件解决异步操作第一种写法
  // sendQuestion() {
  //   const question = this.state.questionInput;
  //
  //   // Action Creator1
  //   const requestPost = (question) => ({ type: 'SEND_QUESTION', status: 'sending...', question });
  //
  //   // Action Creator2
  //   const receivePost = async () => ({
  //     type: 'RECEIVE_ANSWER',
  //     status: '',
  //     answer: await Request.getAnswer({ question })
  //   });
  //
  //   store.dispatch(requestPost(question));
  //
  //   // 重置输入框
  //   this.setState({
  //     questionInput: ''
  //   });
  //
  //   store.dispatch(receivePost());
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // 使用redux-promise中间件解决异步操作第二种写法
  sendQuestion() {
    const question = this.state.questionInput;

    // Action Creator1
    const requestPost = (question) => ({ type: 'SEND_QUESTION', status: 'sending...', question });

    // 发出同步Action
    store.dispatch(requestPost(question));

    // 重置输入框
    this.setState({
      questionInput: ''
    });

    // 发出异步Action
    store.dispatch(
      createAction('RECEIVE_ANSWER')(
        // Promise的then函数返回值才是createAction的第二个参数
        Request.getAnswer({ question }).then((v) => ({
          status: '',
          answer: v
        }))
      )
    );
  }

  render() {
    const status = this.state.status;
    const answer = this.state.answer;
    const question = this.state.question;

    store.subscribe(() => {
      if (this._isMounted) {
        this.setState({
          status: store.getState().val3.status,
          answer: store.getState().val3.answer,
          question: store.getState().val3.question
        });
      }
    });

    return (
      <div>
        <input
          placeholder="input your question..."
          value={this.state.questionInput}
          onChange={(e) => this.setState({ questionInput: e.target.value })}
        />
        <button onClick={() => this.sendQuestion()}>send</button>
        {status}
        <p>The question is {question}</p>
        <p>The answer is {answer.answer}</p>
        <p className={style.imageContainer}>
          <img src={answer.image} alt="answer" className={style.image} />
        </p>
      </div>
    );
  }
}
