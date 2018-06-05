import request from '../../utils/request';
import qs from 'qs';
import member from '../../api/member/MemberServiceApi'

const {api} = member;

export async function query(params) {
  return request(`${api.list}?${qs.stringify(params)}`,{
    method: 'GET',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function del(params){
  return request(`${api.delete}/${params.id}`,{
    method: 'DELETE',
    headers: new Headers(),
    credentials: "include"
  });
}

export async function add(params){
  return request(`${api.add}?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
