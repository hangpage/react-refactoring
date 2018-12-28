import {cloneDeep} from 'lodash';
import moment from 'moment';

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */

export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  let data = cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 转换数据
 * @param   {data}     array
 * @param   {value}    id
 */
export function convertObjToDictObj(data, value) {
  return data.map((item) => {
    var obj = {};
    obj.id = item.id;
    obj.value = item[value];
    return obj;
  })
}


/**
 * 更新数组中对象的value
 * @param   {data}     array
 * @param   {value}    id
 */
export function updateObjectValueInArray(data, value) {
  return data.map((item) => {
    var obj = {};
    obj.id = item.id;
    obj.value = item[value];
    return obj;
  })
}

/**
 * 转换getFieldsValue获取的data，防止有undefined和moment类型的数据
 * @param map
 * @returns {*}
 */
export function reFormatQueryData(map){
  let queryData = cloneDeep(map);
  for(let p in queryData){
    if(typeof queryData[p] !== 'boolean' && !queryData[p]){
      queryData[p] = '';
    }else{
      if(queryData[p] instanceof moment){
        queryData[p] = moment(queryData[p]).format('YYYY-MM-DD');
      }
    }
  }
  return queryData;
}
