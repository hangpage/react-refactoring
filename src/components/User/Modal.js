import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon, Modal, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
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
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const handleOk = () => {
    // validateFields(errors) => {
    //
    // }
    onModalOkClick(getFieldsValue())
  }

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
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(Dialog)
