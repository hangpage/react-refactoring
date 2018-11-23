import React from 'react';
import {connect} from 'dva';
import UserList from './component/datatable';
import UserSearch from '../../../components/common/SearchForm';
import moment from 'moment';

function Users({location, dispatch, users, loading}) {
  const {
    list, total, current,
    currentItem, modalVisible, modalType, pageSize
  } = users;

  const handleRefresh = () => {
    dispatch({
      type: 'users/query',
      payload: {
        pageSize: pageSize || 20,
      }
    })
  }


  const userSearchProps = {
    queryFieldList: [
      {field: 'member', text: '客人姓名', defaultValue: ''},
      {field: 'doctor', text: '医生姓名/手机', defaultValue: ''},
      {field: 'registerTimeStart', text: '挂号日期', type: 'datepicker', defaultValue: moment(new Date())},
      {field: 'registerTimeEnd', text: '到', type: 'datepicker', defaultValue: moment(new Date())},
      {field: 'createTimeStart', text: '创建时间', type: 'datepicker', defaultValue: moment(new Date())},
      {field: 'createTimeEnd', text: '到', type: 'datepicker', defaultValue: moment(new Date())},
      {field: 'registerNum', text: '挂号编号', defaultValue: ''},
    ],
    pageSize: pageSize || 20,
    currentItem: currentItem,
    onSearch(params) {
      dispatch({
        type: 'users/query',
        payload: params
      })
    },
    onCreat() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        }
      })
    }
  };
  const userListProps = {
    dataSource: list,
    total,
    loading: loading.effects['users/query'],
    current,
    modalVisible,
    modalType,
    currentItem,
    pageSize: pageSize || 20,
    size: 'small',
    onComfirmClick(id) {
      dispatch({
        type: 'users/delete',
        payload: {
          id: id
        }
      }).then(() => {
        handleRefresh()
      })
    },
    onEditClick(record) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: record
        }
      })
    },
    onModalCancelClick() {
      dispatch({
        type: 'users/hideModal'
      })
    },
    onModalOkClick(params) {
      console.log(params)
      dispatch({
        type: 'users/create',
        payload: params
      })
    },
    onCancelClick() {
      dispatch({
        type: 'users/hideModal'
      })
    },
    onPageChange(pagination, filters, sorter) {
      dispatch({
        type: 'users/query',
        payload: {
          pageSize: pagination.pageSize,
        }
      })
    }
  };

  return (
    <div>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
    </div>
  )
}


Users.propTypes = {};

function mapStateToProps({users, loading}) {
  return {users, loading};
}

export default connect(mapStateToProps)(Users);
