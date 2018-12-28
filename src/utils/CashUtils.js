import {BigNumber} from 'bignumber.js';

/*
*  bignumber docs https://github.com/MikeMcl/bignumber.js/
*
* */

/**
 * 获取列表中某个字段之和
 * @param   {list}     传入array
 * @param   {field}    要计算的字段
 */
export function getItemTotalMoney(list, field) {
  let total = BigNumber(0);
  list.forEach((item) => {
    total = total.plus(item[field]);
  });
  return total.toFixed(1);
}
