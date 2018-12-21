let dict = {};
dict.activityStatus = [{id: "WKS", value: "未开始"}, {id: "ING", value: "进行中"}, {id: "END", value: "已结束"}];
dict.sex = [{id: "M", value: "男"}, {id: "F", value: "女"}];
dict.offlineRecipelType = [{id: "normal", value: '普通门诊'}, {id: "special", value: '专科'}, {
  id: "package",
  value: '套餐'
}, {id: "accordingparty", value: '照方抓药'}, {id: "goods", value: '直购国货'}];


dict.chargeType = [{value: "ZZBX", label: '保险'}, {value: "HYK", label: '会员卡'}, {value: "TRDF", label: '他人会员卡'}, {
  value: "POS",
  label: 'POS'
}, {value: "XJ", label: '现金'}, {value: "YHZZ", label: '银行转账'}, {value: "ZP", label: '支票'}, {
  value: "YHQ",
  label: '优惠券'
}, {value: "PEACE_CARD", label: '安心卡'}, {value: "ARRE", label: '欠费'}, {value: "WEvalueIAN", label: '微店'}];


export default dict;
