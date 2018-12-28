import { queryUnpayList } from '../../services/cash/CashService'
import { message } from 'antd';

export default {
  namespace: 'uncash',

  state: {
    currentItem: {}, // 当前操作的用户对象
    dataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // location中获取上个页面传入的参数
        // if (location.pathname === '/html/member/info/main.html') {
        //     dispatch({
        //       type: 'query',
        //       payload: location.query || {pageSize: 20, pageNum: 1}
        //     });
        // }
      });

    },
  },

  effects: {
    *query({payload}, {select, put, call}){
      const { data } = yield call(queryUnpayList, payload);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data.data,
            total: data.total,
            pageSize: payload.pageSize || 20,
            current: payload.pageNum || 1
          }
        });
      }
    },
    *create({payload}, {select, put, call}){

    },
    // 因为delete是关键字
    *'delete'({payload}, {select, put, call}){

    },
    *update(){}
  },

  reducers: {
    //reducer 接收参数 state 和 action，返回新的 state，通过语句表达即 (state, action) => newState
    showLoading(state, action){
      return { ...state }
    },
    showModal(state, action){
      return { ...state, modalVisible: true, currentItem: action.payload.currentItem, modalType: action.payload.modalType }
    },
    hideModal(state){
      return { ...state, modalVisible: false }
    },
    querySuccess(state, action){
      return { ...state, ...action.payload};
    },
    handPageClick(state, action){
      return { ...state, current: action.payload.current, pageNum: action.payload.current }
    },
    createSuccess(state, action){
      return { ...state}
    },
    deleteSuccess(state, action){
      return { ...state}
    },
    updateSuccess(){},
  },


};
