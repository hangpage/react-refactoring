import qs from 'qs';
import request from '../../utils/request';

export async function menuService(params) {
  return request('/api/index/menus',{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

