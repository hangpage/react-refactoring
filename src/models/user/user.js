import {query} from '../../services/users/user'
import { message } from 'antd';

export default {
  namespace: 'users',

  state: {
      list: [],
      total: null,
      loading: false, // 控制加载状态
      current: null, // 当前分页信息
      currentItem: {}, // 当前操作的用户对象
      modalVisible: false, // 弹出窗的显示状态
      modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // location中获取上个页面传入的参数
        console.log(location)
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },

  effects: {
    *query({payload}, {select, put, call}){
        yield put({ type: 'showLoading' });
        const { data } = yield call(query);
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              total: 30 || data.data.length,
              current: 1 || data.current
            }
          });
        }
    },
    *create(){},
    // 因为delete是关键字
    async 'delete'({payload}){
        console.log(payload);
        await message.success('Click on Yes');
    },
    *update(){}
  },

  reducers: {
    //reducer 接收参数 state 和 action，返回新的 state，通过语句表达即 (state, action) => newState
    showLoading(state, action){
      return { ...state, loading: true }
    },
    showModal(state){
      return { ...state, modalVisible: true }
    },
    hideModal(state){
      return { ...state, modalVisible: false }
    },
    querySuccess(state, action){
       return { ...state, ...action.payload, loading: false };
    },
    handPageClick(state, action){
      console.log({ ...state, current: action.payload.current });
      return { ...state, current: action.payload.current }
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  },


};
