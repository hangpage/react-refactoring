import request from '../../utils/request';

export async function queryMmeberLevel(params) {
  return request('/api/sys/member/level',{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function querySysDisease(){
  return request('/api/sys/diseases', {
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  })
}
