/**
 * Created by zh on 2019/12/20.
 */
import actionTypes from '@/store/actions/actionTypes';

const sagaTodo = {
  addItem(content) {
    return {
      type: actionTypes.sagaTodo.ADD_ITEM,
      payload: {
        content
      }
    };
  },
  deleteItem(id) {
    return {
      type: actionTypes.sagaTodo.DELETE_ITEM,
      payload: {
        id
      }
    };
  },
  changeItem(item) {
    return {
      type: actionTypes.sagaTodo.CHANGE_ITEM,
      payload: item
    };
  }
};

export default {
  sagaTodo
};
