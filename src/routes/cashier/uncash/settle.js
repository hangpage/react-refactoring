import React from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
//require('../../../index.less');

const columns = [{
  title: '处方编号',
  dataIndex: 'recipelId',
  key: 'recipelId',
}, {
  title: '类别',
  dataIndex: 'dataTypeName',
  key: 'dataTypeName',
}, {
  title: '明细',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '数量',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: '剂型',
  dataIndex: 'dosageformName',
  key: 'dosageformName',
}, {
  title: '原价',
  dataIndex: 'originPrice',
  key: 'originPrice',
}, {
  title: '折后金额',
  dataIndex: 'price',
  key: 'price',
}];

const Settle = ({location, dispatch, settle}) => {
  const {unSettleList, memberInfo} = settle;
  return (
    <div>
      <span className="bold-title">患者信息</span>
      <div className="info-box">
        <span>患者：{memberInfo.memberName}</span>
        <span>手机：{memberInfo.memberMobile}</span>
        <span>性别：{memberInfo.memberSex}</span>
        <span>年龄：{memberInfo.memberAge}</span>
        <span>就诊医师：{memberInfo.doctorName}</span>
        <span>就诊类型：{memberInfo.visitType}</span>
        <span>就诊待遇：{memberInfo.levelName}</span>
        <span>保险：{memberInfo.memberInsurName}</span>
      </div>
      <Table
        rowKey="id"
        dataSource={unSettleList}
        bordered={true}
        pagination={false}
        size="middle"
        columns={columns}/>
    </div>
  )
};


function mapStateToProps({settle, loading}) {
  return {settle, loading};
}

export default connect(mapStateToProps)(Settle);
