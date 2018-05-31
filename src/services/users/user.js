import request from '../../utils/request';

export async function query(params) {
  return request('/api/sys/dict/type/MEMBER_HealthCirculatory');
}
