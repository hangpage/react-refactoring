import request from '../../utils/request';
import qs from 'qs';
import CashUrlConst from '../../api/cash/CashUrlConst'


export async function queryUnpayList(params){
  return request(`${CashUrlConst.Unpay_List}?${qs.stringify(params)}`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}
