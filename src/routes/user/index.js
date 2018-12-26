import React from 'react';
import {connect} from 'dva';
import {Popconfirm} from 'antd';
import UserSearch from '../../components/common/SearchForm';
import Dialog from './component/Modal';
import SysUrlConst from '../../const/SysUrlConst';
import DataTable from '../../components/common/DataTable';


const queryFieldList = [
  {field: 'name', text: '姓名', defaultValue: ''},
  {field: 'mobile', text: '手机号', defaultValue: ''},
  {field: 'identityType', text: '证件类型', type: 'combobox', url: SysUrlConst.SYS_MEMBER_CERTIFICATE, nameProp: 'value', defaultValue: ''},
  {field: 'identityCode', text: '证件号码', defaultValue: ''},
  {field: 'archivesNo', text: '档案号', defaultValue: ''},
  {field: 'memberLevel', text: '会员卡级别', type: 'combobox', url: SysUrlConst.SYS_MEMBER_LEVEL, nameProp: 'levelName', defaultValue: ''},
  {field: 'cardStatus', text: '会员卡状态', type: 'combobox', url: SysUrlConst.SYS_MEMBER_CARD_STATUS, valueProp: 'code', nameProp: 'value', defaultValue: ''},
  {field: 'memberCardNum', text: '会员卡号', defaultValue: ''},
  {field: 'profileLocation', text: '门店', type: 'combobox', url: SysUrlConst.SYS_HOSPITAL, defaultValue: ''},
  {field: 'firstDisease', text: '病种', type: 'combobox', url: SysUrlConst.SYS_DISEASE, defaultValue: ''},
];

class Users extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      params: {},
      modalType: 'create',
      modalVisible: false,
      currentItem: {},
    }
  }
  onSearch = (params) => {
    this.setState({params: params});
  }
  onCreat = () => {
    this.setState({
      modalVisible: true,
      modalType: 'create'
    })
  }
  handleOk = () => {
    this.setState({modalVisible: false});
  }
  handleRefresh(){

  }
  handleDeleteConfirmClick(record, e){

  }

  handleEditClick(record){
    this.setState({
      modalVisible: true,
      modalType: 'edit',
      currentItem: record
    });
  }
  render(){
    const {params, modalVisible, modalType} = this.state;
    const currentItem = modalType === 'create' ? {} : this.state.currentItem;
    const columns = [{
      title: '姓名',
      dataIndex: 'memberName',
      key: 'memberName',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    }, {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
    }, {
      title: '档案号',
      dataIndex: 'archivesNo',
      key: 'archivesNo',
    }, {
      title: '档案存放地',
      dataIndex: 'profileLocationName',
      key: 'profileLocationName',
    }, {
      title: '证件类型',
      dataIndex: 'identityTypeName',
      key: 'identityTypeName',
    }, {
      title: '证件号码',
      dataIndex: 'identityCode',
      key: 'identityCode',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <p>
          <a onClick={e => this.handleEditClick(record, e)}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={e => this.handleConfirmClick(record, e)} cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </p>
      ),
    }];
    return(
      <div>
        <UserSearch
          queryFieldList={queryFieldList}
          onSearch={this.onSearch}
          onCreat={this.onCreat}
        />
        <DataTable
          columns={columns}
          onPageChange={this.onPageChange}
          params={params}
          url='/api/member/info/list'
        />
        <Dialog
          modalVisible={modalVisible}
          modalType={modalType}
          currentItem={currentItem}
          handleOk={this.handleOk}
        />
      </div>
    )
  }
}

export default Users;
