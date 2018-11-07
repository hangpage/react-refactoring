import * as dictionaryService from "../services/dictionary/DictionaryService";

const convertObjToDictObj = (data, value) => {
  return data.map((item) => {
      var obj = {};
      obj.id = item.id;
      obj.value = item[value];
      return obj;
    })
}

var dict = {};
dict.activityStatus = [{id: "WKS", value: "未开始"}, {id: "ING", value: "进行中"}, {id: "END", value: "已结束"}];
dict.sex = [{id: "M", value: "男"}, {id: "F", value: "女"}];


export default dict;
