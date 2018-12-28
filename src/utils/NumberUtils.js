/**
 * @description: 数字方法
 * @author: zzhihang@hotmail.com
 * @date: 2018/12/26
*/

class NumberUtils {
  formatPhoneWidthStar(phone){
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
}

export default new NumberUtils();
