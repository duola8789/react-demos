/**
 * Created by zh on 2019/12/20.
 */
export default {
  sagaTodo: {
    ADD_ITEM: Symbol('addItem'),
    DELETE_ITEM: Symbol('deleteItem'),
    CHANGE_ITEM: Symbol('changeItem'),
    UPDATE_LIST: Symbol('updateList'),
    CHANGE_LOADING: Symbol('changeLoading')
  }
};
