import request from '../../utils/request';
import qs from 'qs';
import CashUrlConst from '../../api/cash/CashUrlConst'


export async function queryUnpayList(params){
  return request(`${CashUrlConst.SETTLEMENT_UNPAY_LIST}?${qs.stringify(params)}`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function querySettlementUnSettled(orderId){
  return request(`${CashUrlConst.SETTLEMENT_UNSETTLED}/${orderId}`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function querySettlementMemberInfo(memberId, virsitRecordId){
  return request(`${CashUrlConst.SETTLEMENT_MEMBER_INFO}/${memberId}?virsitRecordId=${virsitRecordId}`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function queryMemberVoucher(params){
  params.pageSize = 1000;
  return request(`${CashUrlConst.MEMBER_VOUCHER_LIST}?${qs.stringify(params)}`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

