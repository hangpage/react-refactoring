import {querySettlementUnSettled, querySettlementMemberInfo} from '../../services/cash/CashService'
import {message} from 'antd';

export default {
  namespace: 'settle',

  state: {
    params: {},
    unSettleList: [],
    memberInfo: {}
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/uncash/settle') {
          dispatch({
            type: 'queryUnsettleList',
            payload: {
              orderId: location.state.id
            }
          });
          dispatch({
            type: 'queryMemberInfo',
            payload: {
              memberId: location.state.memberId,
              virsitRecordId: location.state.id
            }
          });
          dispatch({
            type: 'updateState',
            payload: {
              params: location.state
            }
          });
        }
      })
    },
  },

  effects: {
    * queryUnsettleList({payload}, {select, put, call}) {
      const {data} = yield call(querySettlementUnSettled, payload.orderId);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            unSettleList: data.data
          }
        });
      }
    },
    *queryMemberInfo({payload}, {select, put, call}){
      const {data} = yield call(querySettlementMemberInfo, payload.memberId, payload.virsitRecordId);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            memberInfo: data.data
          }
        });
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload};
    },
  }

}
