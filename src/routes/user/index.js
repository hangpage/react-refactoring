import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import UserList from '../../components/User/UserList';
import UserSearch from '../../components/User/UserSearch';
import dict from '../../utils/dictionary'

function Users({ location, dispatch, users }){
  const {
    loading, list, total, current,
    currentItem, modalVisible, modalType, pageSize, pageNum
  } = users;
  const userSearchProps = {
    queryFieldList: [
      { field: 'name', text: '姓名', defaultValue: ''},
      { field: 'mobile', text: '手机号', defaultValue: ''},
      { field: 'identityType', text: '证件类型', type: 'combobox', datasource: dict.activityStatus, defaultValue: ''},
      { field: 'identityCode', text: '证件号码', defaultValue: ''},
      { field: 'archivesNo', text: '档案号', defaultValue: ''},
      { field: 'memberLevel', text: '会员卡级别', defaultValue: ''},
      { field: 'cardStatus', text: '会员卡状态', defaultValue: ''},
      { field: 'memberCardNum', text: '会员卡号', defaultValue: ''},
      { field: 'profileLocation', text: '门店', defaultValue: ''},
      { field: 'firstDisease', text: '病种', defaultValue: ''},
    ],
    pageSize: 20,
    pageNum: current,
    onSearch(params){
        dispatch({
          type: 'users/query',
          payload: params
        })
    }
  };
  const userListProps={
    dataSource: list,
    total,
    loading,
    current,
    modalVisible,
    pageSize: pageSize || 20,
    size: 'small',
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
        type: 'users/query',
        payload: {
          pageSize: 20,
          pageNum: pagination,
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
//使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
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
