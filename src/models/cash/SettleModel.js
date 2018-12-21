import {querySettlementUnSettled, querySettlementMemberInfo, queryMemberVoucher} from '../../services/cash/CashService';
import dict from '../../utils/dictionary'
import _ from 'lodash';
import {message} from 'antd';
import {getItemTotalMoney} from "../../utils/CashUtils";

const MAX_CHARGETYPE_LENGTH = 2;

export default {
  namespace: 'settle',

  state: {
    params: {},
    unSettleList: [],
    chargeTypeOptions: dict.chargeType,
    memberInfo: {},
    chargeTypeDefaultValue: [],
    chargeTypeValue: [],
    totalMoney: 0,
    hasMemberCard: false,
    voucherList: []
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
            type: 'queryMemberVoucher',
            payload: {
              memberId: location.state.memberId
            }
          })
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
        const total = getItemTotalMoney(data.data, 'price');
        yield put({
          type: 'updateState',
          payload: {
            unSettleList: data.data,
            totalMoney: total
          }
        });
      }
    },
    * queryMemberInfo({payload}, {select, put, call}) {
      const {data} = yield call(querySettlementMemberInfo, payload.memberId, payload.virsitRecordId);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            memberInfo: data.data
          }
        });
      }
    },
    * queryMemberVoucher({payload}, {select, put, call}){
      const {data} = yield call(queryMemberVoucher, payload);
      if(data.success){
        yield put({
          type: 'updateState',
          payload: {
            voucherList: data.data
          }
        })
      }
    }
  },

  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload};
    },
    updateValue(state, action) {
      let array = [];
      state.chargeTypeOptions.forEach((item) => {
        let map = {};
        if (action.payload.chargeTypeValue.length === MAX_CHARGETYPE_LENGTH
          && action.payload.chargeTypeValue.indexOf(item.value) === -1) {
          map.label = item.label;
          map.value = item.value;
          map.disabled = true;
        } else {
          map.label = item.label;
          map.value = item.value;
        }
        array.push(map);
      });
      return {...state, ...{chargeTypeOptions: array}};
    }
  }

}
