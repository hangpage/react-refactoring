import request from '../../utils/request';
import qs from 'qs';

export async function query(params) {
  return request('/api/member/info/list?'+ qs.stringify(params),{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}
