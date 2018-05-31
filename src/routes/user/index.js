import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import UserList from '../../components/User/UserList';
import UserSearch from '../../components/User/UserSearch';
import dict from '../../utils/dictionary'

function Users({ location, dispatch, users }){
  const {
    loading, list, total, current,
    currentItem, modalVisible, modalType
  } = users;
  const userSearchProps = {
    queryFieldList: [
      { field: 'name', text: '姓名'},
      { field: 'mobile', text: '手机号'},
      { field: 'identityType', text: '证件类型', type: 'combobox', datasource: dict.activityStatus},
      { field: 'identityCode', text: '证件号码'}
    ],

  };
  const userListProps={
    dataSource: list,
    total,
    loading,
    current,
    modalVisible,
    onComfirmClick(id){
      dispatch({
        type: 'users/delete',
        payload: {id: id}
      })
    },
    onEditClick(id){
      dispatch({
        type: 'users/showModal'
      })
    },
    onModalCancelClick(){
      dispatch({
        type: 'users/hideModal'
      })
    },
    onModalOkClick(){
      dispatch({
        type: 'users/hideModal'
      })
    },
    onPageChange(pagination, filters, sorter){
      dispatch({
        type: 'users/handPageClick',
        payload: {
          current: pagination
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


Users.propTypes = {

};

// 指定订阅数据，这里关联了 users
function mapStateToProps({ users }) {
  return {users};
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: id => {
//       dispatch(toggleTodo(id))
//     },
//     onDeleteConfirm: id => {
//       dispatch()
//     }
//   }
// }


// 建立数据关联关系
//connect方法做的事情是将state和dispatch绑定到Connect组件的参数上,
//然后Connect组件将你当前的App组件封装起来
//使得App组件可以通过props获取到父组件Connect传递的state和props。
export default connect(mapStateToProps)(Users);
