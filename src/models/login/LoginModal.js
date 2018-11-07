import {loginService} from '../../services/login/LoginService'
import { routerRedux } from 'dva/router'
import { message } from 'antd';

const loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {
  username: '',
  password: '',
  type: 'system',
  remember: false
};

export default {
  namespace: 'login',

  state: loginInfo,

  subscriptions: {
    setup({ dispatch, history }) {
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        if(loginInfo && loginInfo.remember){

        }
    },
  },

  effects: {
     *login({payload}, {select, put, call}){
      const {data} = yield call(loginService, payload);
      if (data.success) {
          message.info(data.msg);
          payload.remember ? localStorage.setItem('loginInfo', JSON.stringify(payload)) : localStorage.setItem('loginInfo', null);
          yield put({
            type: 'loginSuccess',
            payload
          })
          yield put(routerRedux.push('/'));
      }
    },
  },

  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload};
    },
    onCheckBoxChange(state, action){
      return { ...state, ...action.payload};
    }
  },

};
