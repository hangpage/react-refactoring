import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { Table, message, Modal, Popconfirm } from 'antd';

const UserList = ({
      total,
      current,
      loading,
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
        dataIndex: 'value',
        key: 'value',
      }, {
        title: '年龄',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '住址',
        dataIndex: 'code',
        key: 'code',
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
      pageSize: 5,
      onChange: onPageChange,
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          locale={{emptyText: '暂无数据'}}
          rowKey={record => record.id}
          pagination={pagination}
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

UserList.propTypes = {

};

export default UserList;
