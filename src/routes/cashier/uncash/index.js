import React from 'react';
import {connect} from 'dva';
import SearchForm from '../../../components/common/SearchForm';
import moment from 'moment';
import DataTable from "../../../components/common/DataTable";
import ConstUrlConst from "../../../api/cash/CashUrlConst";
import _ from 'lodash';
import dict from '../../../utils/dictionary'
import ALink from '../../../components/common/ALink';

function Uncash({location, dispatch, uncash}) {
  const {
    dataSource, current,
    params,
    currentItem
  } = uncash;


  const SearchFormProps = {
    queryFieldList: [
      {field: 'member', text: '客人姓名', defaultValue: ''},
      {field: 'doctor', text: '医生姓名/手机', defaultValue: ''},
      {field: 'registerTimeStart', text: '挂号日期', type: 'datepicker'},
      {field: 'registerTimeEnd', text: '到', type: 'datepicker'},
      {field: 'createTimeStart', text: '创建时间', type: 'datepicker'},
      {field: 'createTimeEnd', text: '到', type: 'datepicker'},
      {field: 'registerNum', text: '挂号编号', defaultValue: ''},
    ],
    currentItem: currentItem,
    onSearch(params) {
      dispatch({
        type: 'uncash/query',
        payload: params
      })
    },
  };
  const userListProps = {
    currentItem,
    size: 'small',
    onEditClick(record) {
      dispatch({
        type: 'uncash/showModal',
        payload: {
          modalType: 'update',
          currentItem: record
        }
      })
    },
  };

  const onSettleClick = (row) => {
    console.log(row)
  };


  const columns = [{
    title: '操作',
    dataIndex: 'opt',
    render: (text, record) => (
      <ALink onClick={() => onSettleClick(record)} text="结算"></ALink>
    )
  }, {
    title: '已审处方数',
    dataIndex: 'recipelAmount',
  }, {
    title: '挂号编号',
    dataIndex: 'registerNum',
  }, {
    title: '门诊类型',
    dataIndex: 'visitType',
    render: (text, record) => (
      _.find(dict.offlineRecipelType, {'id': record.visitType}).value
    ),
  }, {
    title: '客人姓名',
    dataIndex: 'memberName',
  }, {
    title: '客人手机',
    dataIndex: 'memberMobile',
  }, {
    title: '年龄',
    dataIndex: 'memberAge',
  }, {
    title: '大夫',
    dataIndex: 'doctorName',
  }];

  return (
    <div>
      <SearchForm {...SearchFormProps} />
      <DataTable
        columns={columns}
        params={params}
        url={ConstUrlConst.Unpay_List}
        dataSource={dataSource}
      />
    </div>
  )
}


Uncash.propTypes = {};

function mapStateToProps({uncash, loading}) {
  return {uncash, loading};
}

export default connect(mapStateToProps)(Uncash);
