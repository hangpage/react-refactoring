import React from 'react';
import {connect} from 'dva';
import {Input, Checkbox, Button, message} from 'antd';
import DataTable from "../../../components/common/DataTable";
import MemberInfoBox from "../../../components/common/MemberInfoBox";
import ComboBox from "../../../components/common/ComboBox";
import PayTypeConst from "../../../const/PayTypeConst";
import classNames from 'classnames'
import SysUrlConst from "../../../const/SysUrlConst";
import {numberPatter} from "../../../const/RegPattern";
import BigNumber from "bignumber.js";
import _ from 'lodash';
//require('../../../index.less');

const {TextArea} = Input;

const COLUMNS_ALIGN_TYPE = 'center';

const columns = [{
  title: '处方编号',
  dataIndex: 'recipelId',
  key: 'recipelId',
  align: COLUMNS_ALIGN_TYPE
}, {
  title: '类别',
  dataIndex: 'dataTypeName',
  key: 'dataTypeName',
  align: COLUMNS_ALIGN_TYPE
}, {
  title: '明细',
  dataIndex: 'title',
  key: 'title',
  align: COLUMNS_ALIGN_TYPE
}, {
  title: '数量',
  dataIndex: 'amount',
  key: 'amount',
  align: COLUMNS_ALIGN_TYPE
}, {
  title: '剂型',
  dataIndex: 'dosageformName',
  key: 'dosageformName',
  align: COLUMNS_ALIGN_TYPE
}, {
  title: '原价',
  dataIndex: 'originPrice',
  key: 'originPrice',
  align: COLUMNS_ALIGN_TYPE
}, {
  title: '折后金额',
  dataIndex: 'price',
  key: 'price',
  align: COLUMNS_ALIGN_TYPE
}];

const Settle = ({location, dispatch, settle, loading}) => {
  const {
    unSettleList, memberInfo, chargeTypeOptions, chargeTypeValue, chargeTypeDefaultValue, totalMoney, voucherList,
    otherState, calcMoneyList
  } = settle;

  const onChange = (value) => {
    let calcList = _.cloneDeep(calcMoneyList);
    dispatch({
      type: 'settle/updateValue',
      payload: {
        chargeTypeValue: value
      }
    });
    if(value.length === 1){//只有一种支付方式的时候永远都是totalMoney
      let find = calcList.find(o => o.chargeType === value[0]);
      if(find){
        find.value = totalMoney;
      }else{
        calcList.push({
          chargeType: value[0],
          value: totalMoney
        })
      }
    }else if(value.length === 2){
      let find = calcList.find(o => o.chargeType === value[1]);
      const secondValue = BigNumber(totalMoney).minus(calcList.find(o => o.chargeType === value[0]).value).toNumber();
      if(find){
        find.value = secondValue;
      }else{
        calcList.push({
          chargeType: value[1],
          value: secondValue
        })
      }
    }
    dispatch({
      type: 'settle/updateCalcMoneyList',
      payload: {
        calcMoneyList: calcList
      }
    })
  };

  let tableRef = null; //声明ref,保存表格ref

  const getSelectedRows = (e) => {
    return tableRef.getSelectedRows();
  };

  const handleSettle = () => {
    const data = getSelectedRows();
    if (!data.length) {
      return message.error('请选择收费项目！');
    }
  };

  const onMoneyInputChange = (payType, e) => {
    let value = e.target.value.replace(numberPatter, '') || 0;
    if (Number(value) > Number(totalMoney)) {
      value = totalMoney;
    }

    let newOtherState = _.cloneDeep(otherState); //额外的state状态，例如会员卡余额
    switch (payType) {
      case PayTypeConst.HUI_YUAN_KA:
        if(Number(memberInfo.memberCard.balance) < Number(value)){
          value = 0;
          message.error('会员卡余额不足！');
        }
        newOtherState.balanceAfterPay = BigNumber(memberInfo.memberCard.balance).minus(value).toNumber();
        break;
    }

    let list = _.cloneDeep(calcMoneyList);
    //TODO 考虑封装方法有key则update,没有就创建key
    let find = list.find((item) => item.chargeType === payType);
    if (!_.isEmpty(find)) {//如果是已选支付方式则更新value
      find.value = value;
    } else {
      list.push({chargeType: payType, value});
    }
    //重新组装calcMoneyList, 使得calcMoneyList至多存在两种支付方式;
    let newList = [];
    for (let i = 0; i < list.length; i++) {
      const listElement = list[i];
      if (chargeTypeValue.indexOf(listElement.chargeType) !== -1) {
        newList.push(listElement);
      }
    }
    if(chargeTypeValue.length === 2){
      let finder = newList.find((o) => o.chargeType !== payType);
      if(finder){
        finder.value = BigNumber(totalMoney).minus(value).toNumber();
      }else{//如果另外一种支付方式还未编辑过价格,没有编辑过价格是不会出现在calcMoneyList中的
        newList.push({
          chargeType: chargeTypeValue.find(o => o !== payType),
          value: BigNumber(totalMoney).minus(value)
        })
      }
    }

    dispatch({
      type: 'settle/updateCalcMoneyList',
      payload: {
        calcMoneyList: newList,
        otherState: newOtherState
      }
    });
  };

  const calcPrice = (calcMoneyList, payType) => {
    const find = calcMoneyList.find((calc) => calc.chargeType === payType);
    return find ? find.value : 0.00;
  };

  return (
    <div>
      <div className="cash-bold-title">患者信息</div>
      <MemberInfoBox memberInfo={memberInfo}/>
      <div className="cash-bold-title">收费项目</div>
      <DataTable
        rowKey="id"
        dataSource={unSettleList}
        bordered={true}
        pagination={false}
        size="middle"
        rowSelection={{type: "checkbox"}}
        columns={columns}
        ref={ref => {
          tableRef = ref
        }}
      />
      <div className="cash-bold-title">备注</div>
      <TextArea placeholder="收费备注" autosize/>
      <div className="cash-bold-title">选择支付方式<span className="lyb-info">(最多支持两种支付方式)</span></div>
      <Checkbox.Group onChange={onChange} defaultValue={chargeTypeDefaultValue}>
        {/*提示客人资产信息*/}
        {chargeTypeOptions.map((item) => {
          let text = '';
          switch (item.label) {
            case '会员卡':
              if (!_.isEmpty(memberInfo.memberCard)) {
                text = '(该客人有会员卡)';
              } else {
                text = '(该客人无会员卡)';
              }
              break;
            case '优惠券':
              if (voucherList.length) {
                text = `(${voucherList.length}张可用)`
              }
              break;
          }
          return <Checkbox value={item.value} disabled={item.disabled} key={item.value}>{item.label}<span
            className="lyb-color">{text}</span></Checkbox>;
        })
        }
      </Checkbox.Group>
      <div>
        <div className={classNames({
          'charge-box': true,
          'his-hide': chargeTypeValue.indexOf(PayTypeConst.HUI_YUAN_KA) === -1
        })}>
          <span>方式：会员卡</span>
          <span>卡号：</span>
          <Input disabled={true} value={memberInfo.memberCard && memberInfo.memberCard.transactionNo}/>
          <span>卡内余额：</span>
          <Input disabled={true} value={memberInfo.memberCard && memberInfo.memberCard.balance}/>
          <span>实收金额：</span>
          <Input onChange={(e) => onMoneyInputChange(PayTypeConst.HUI_YUAN_KA, e)}
                 value={calcPrice(calcMoneyList, PayTypeConst.HUI_YUAN_KA)}/>
          <span>支付后余额：</span>
          <Input disabled={true} value={otherState.balanceAfterPay}/>
        </div>
        <div className={classNames({
          'charge-box': true,
          'his-hide': chargeTypeValue.indexOf(PayTypeConst.POS) === -1
        })}>
          <span>方式：POS</span>
          <span>机器：</span>
          <ComboBox url={SysUrlConst.SYS_POS} text="transactionId" valueProp="transactionId" nameProp="transactionId"/>
          <span>卡号后四位：</span>
          <Input/>
          <span>实收金额：</span>
          <Input onChange={(e) => onMoneyInputChange(PayTypeConst.POS, e)}
                 value={calcPrice(calcMoneyList, PayTypeConst.POS)}/>
        </div>
        <div className={classNames({
          'charge-box': true,
          'his-hide': chargeTypeValue.indexOf(PayTypeConst.XIAN_JIN) === -1
        })}>
          <span>方式：现金</span>
          <span>实收金额：</span>
          <Input onChange={(e) => onMoneyInputChange(PayTypeConst.XIAN_JIN, e)}
                 value={calcPrice(calcMoneyList, PayTypeConst.XIAN_JIN)}/>
        </div>
        <div className={classNames({
          'charge-box': true,
          'his-hide': chargeTypeValue.indexOf(PayTypeConst.YIN_HANG_ZHUAN_ZHANG) === -1
        })}>
          <span>方式：现金</span>
          <span>实收金额：</span>
          <Input onChange={(e) => onMoneyInputChange(PayTypeConst.YIN_HANG_ZHUAN_ZHANG, e)}
                 value={calcPrice(calcMoneyList, PayTypeConst.YIN_HANG_ZHUAN_ZHANG)}/>
        </div>
      </div>
      <div className="cash-bold-title">收费金额</div>
      <div>费用合计：{totalMoney}</div>
      <div className="text-align-center">
        <Button type="primary" onClick={handleSettle} htmlType="button">结算</Button>
        <Button type="primary" className="ml20" htmlType='button'>取消</Button>
      </div>
    </div>
  )
};


function mapStateToProps({settle, loading}) {
  return {settle, loading};
}

export default connect(mapStateToProps)(Settle);
