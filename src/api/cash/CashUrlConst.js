const CashUrlConst = {};

const API = '/api';

//查询系统待支付列表
CashUrlConst.SETTLEMENT_UNPAY_LIST = `${API}/settlement/unpayList`;

//查询患者待支付收费项
CashUrlConst.SETTLEMENT_UNSETTLED = `${API}/settlement/unSettled`;

//查询患者信息
CashUrlConst.SETTLEMENT_MEMBER_INFO = `${API}/settlement/member`;

//查询患者优惠券列表，默认传入pageSize 100查出来患者所有优惠券
CashUrlConst.MEMBER_VOUCHER_LIST = `${API}/member/voucher/list`;


export default CashUrlConst;

