import React from 'react';
import PropTypes from 'prop-types';
import {Popconfirm} from 'antd';
import Dialog from './Modal';
import DataTable from '../common/DataTable';

const UserList = ({
                    total,
                    current,
                    currentItem,
                    loading,
                    pageSize,
                    dataSource,
                    onComfirmClick,
                    onEditClick,
                    modalVisible,
                    modalType,
                    onModalOkClick,
                    onModalCancelClick,
                    onPageChange
                  }) => {

  const handleConfirmClick = (record, e) => {
    onComfirmClick(record.id);
  }

  const handleEditClick = (record, e) => {
    onEditClick(record, e)
  }


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
        <a onClick={e => handleEditClick(record, e)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={e => handleConfirmClick(record, e)} cancelText="取消">
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];
  //定义分页对象


  const pagination = {
    pageNum: current || 1,
    pageSize: pageSize || 20,
    size: 'small',
    showSizeChanger: true,
    showQuickJumper: true,
    total: total
  };

  const dialogProps = {
    currentItem: modalType === 'create' ? {} : currentItem,
    modalVisible,
    onModalOkClick,
    onModalCancelClick,
    modalType,
  }


  return (
    <div>
      <DataTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        onPageChange={onPageChange}
      />
      <Dialog {...dialogProps} />
    </div>
  )
}

UserList.propTypes = {};

export default UserList;
