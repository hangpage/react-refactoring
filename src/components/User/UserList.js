import React from 'react';
import PropTypes from 'prop-types';
import {Table, Modal, Popconfirm} from 'antd';
import styles from '../../index.less';

const UserList = ({
                    total,
                    current,
                    loading,
                    pageSize,
                    size,
                    dataSource,
                    onComfirmClick,
                    onEditClick,
                    modalVisible,
                    onModalCancelClick,
                    onModalOkClick,
                    onPageChange
                  }) => {
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
        <a onClick={onEditClick}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={onComfirmClick}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];
  //定义分页对象
  const pagination = {
    total,
    current,
    pageSize,
    onChange: onPageChange,
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        locale={{emptyText: '暂无数据'}}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
        size={size}
        className={styles.mt10}
      /><Modal
      title="Basic Modal"
      visible={modalVisible}
      onCancel={onModalCancelClick}
      onOk={onModalOkClick}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
    </div>
  )
}

UserList.propTypes = {};

export default UserList;
