import request from '../../utils/request';

const api = '/api/index';

/**
 * 查询菜单
 * @param params
 * @returns {Promise<*>}
 */
export async function menuService(params) {
  return request(`${api}/menus`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * 查询可切换门店
 * @param params
 * @returns {Promise<*>}
 */
export async function dropHospitalsService(params) {
  return request(`${api}/hospitals?special=Y`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

/**
 * 切换门店
 * @param params
 * @returns {Promise<*>}
 */
export async function switchStoreService(params) {
  return request(`${api}/change/${params}`, {
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function queryLoginUserService(params) {
  return request(`${api}/userinfo`, {
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}
