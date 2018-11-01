import {loginService} from '../../services/login/LoginService'
import { routerRedux } from 'dva/router'
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
      username: '',
      password: '',
      type: '',
      loading: false, // 控制加载状态
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
     *login({payload}, {select, put, call}){
      yield put({ type: 'showLoading' });
      const {data} = yield call(loginService, payload);
       console.log(data);
      if (data.success) {

          message.info(data.msg);
          yield put(routerRedux.push({
              pathname: '/',
              state: {

              }
          }))
      }
    },
  },

  reducers: {
    loginSuccess(state, action) {
      console.log(state, action)
      return { ...state, loading: false };
    },
  },

};
