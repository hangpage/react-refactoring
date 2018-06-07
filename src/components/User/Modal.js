import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon, Modal, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker} from 'antd';
import dict from '../../utils/dictionary'

const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];


const Dialog = ({
                  onModalOkClick,
                  onModalCancelClick,
                  modalVisible,
                  modalType,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {

  const handleOk = () => {
    // validateFields(errors) => {
    //
    // }
    onModalOkClick(getFieldsValue())
  }

  const options = dict.sex.map(item => <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>);
  return (
    <Modal
      title={modalType === 'creat' ? '新增' : '编辑'}
      onOk={handleOk}
      onCancel={onModalCancelClick}
      visible={modalVisible}
      maskClosable={false}
      destroyOnClose={true}
    >
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('name', {
            rules: [ {
              required: true, message: '必填',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: '请选择性别!' }],
          })(
            <Select allowClear={true}>
              {options}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="生日"
        >
          {getFieldDecorator('birthday', {
            rules: [{ required: true, message: '请选择生日!' }],
          })(
            <DatePicker allowClear={true} showToday={false} placeholder="" />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(Dialog)
