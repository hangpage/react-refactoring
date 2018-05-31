import qs from 'qs';
import request from '../../utils/request';

export async function login(params) {
  return request('/api/index/login?' + qs.stringify(params), {
    method: 'post',
    //body: qs.stringify(params),
    // headers: {
    //   "Content-Type": "application/json"
    // },
  });
}
