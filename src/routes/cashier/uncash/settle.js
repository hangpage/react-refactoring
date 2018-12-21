import React from 'react';
import {connect} from 'dva';
import {Input, Checkbox, Button} from 'antd';
import DataTable from "../../../components/common/DataTable";
import MemberInfoBox from "../../../components/common/MemberInfoBox";
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

// class Settle extends React.Component{
//     constructor(props){
//       super(props);
//       this.
//     }
//
// }

const Settle = ({location, dispatch, settle}) => {
  const {unSettleList, memberInfo, chargeTypeOptions, chargeTypeDefaultValue, totalMoney, hasMemberCard, voucherList} = settle;
  const onChange = (value) => {
    dispatch({
      type: 'settle/updateValue',
      payload: {
        chargeTypeValue: value
      }
    })
  };

  let tableRef = null; //声明ref

  const getSelectedRows = (e) =>{
      console.log(tableRef.getSelectedRows());
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
        ref={ref => {tableRef = ref}}
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
              if (hasMemberCard) {
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
      <div className="cash-bold-title">收费金额</div>
      <div>费用合计：{totalMoney}</div>
      <div className="text-align-center">
        <Button type="primary">结算</Button>
        <Button type="primary" className="ml20">取消</Button>
      </div>
    </div>
  )
};


function mapStateToProps({settle, loading}) {
  return {settle, loading};
}

export default connect(mapStateToProps)(Settle);
