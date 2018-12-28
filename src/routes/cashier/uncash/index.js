import React from 'react';
import {connect} from 'dva';
import SearchForm from '../../../components/common/SearchForm';
import moment from 'moment';
import DataTable from "../../../components/common/DataTable";
import CashUrlConst from "../../../api/cash/CashUrlConst";
import _ from 'lodash';
import dict from '../../../utils/dictionary'
import {Link ,routerRedux} from 'dva/router';

function Uncash({location, dispatch, uncash, loading}) {
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
    routerRedux.push('/uncash/settle')
  };

  const style = {
    color: '#CE8C26'
  };

  const columns = [{
    title: '操作',
    dataIndex: 'opt',
    render: (text, record) => (
      <Link to={{
          pathname: '/uncash/settle',
          state: record
        }} style={style}>结算</Link>
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

  console.log(loading)
  return (
    <div>
      <SearchForm {...SearchFormProps} />
      <DataTable
        columns={columns}
        params={params}
        url={CashUrlConst.SETTLEMENT_UNPAY_LIST}
        dataSource={dataSource}
        loading={loading.effects['uncash/query']}
      />
    </div>
  )
}


Uncash.propTypes = {};

function mapStateToProps({uncash, loading}) {
  return {uncash, loading};
}

export default connect(mapStateToProps)(Uncash);
