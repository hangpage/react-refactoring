import request from '../../utils/request';
import qs from 'qs';

export async function queryMmeberLevel(params) {
  return request('/api/sys/member/level',{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}
