/**
 * @Description: 日期方法
 * @Author: zzhihang@hotmail.com
 * @Date: 2018/12/26 17:22
*/
class DateUtils {
  getAgeByYear(year){
    if (!year) {
      return ''
    }
    const beforeYear = new Date(year).getFullYear();
    const todayYear = new Date().getFullYear();
    const age = todayYear - beforeYear;
    return age;
  }
}


export default new DateUtils();
