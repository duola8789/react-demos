/**
 * Created by zh on 2019/3/6.
 */
import API from './api';
import { get } from './helpers';

const getAnswer = async (params) => get(API.yesOrNoApi, params);

export default {
  getAnswer
};
