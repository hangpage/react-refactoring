import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Modal,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker
} from 'antd';
import dict from '../../utils/dictionary'
import moment from 'moment';
import styles from '../../index.less'

const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

const Dialog = ({
                  onModalOkClick,
                  onModalCancelClick,
                  modalVisible,
                  modalType,
                  currentItem,
                  form: {
                    getFieldDecorator,
                    validateFields,
                    getFieldsValue,
                  },
                }) => {

  const handleOk = () => {
    const value = getFieldsValue();
    value.birthday = value.birthday.format('YYYY-MM-DD');
    onModalOkClick(value);
  }

  const options = dict.sex.map(item => <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>);
  return (
    <Modal
      title={modalType === 'create' ? '新增' : '编辑'}
      wrapClassName="vertical-center-modal"
      className="vertical-center-modal"
      onOk={handleOk}
      onCancel={onModalCancelClick}
      visible={modalVisible}
      maskClosable={false}
      destroyOnClose={true}
      width={1000}
    >
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSubmit}
      >
        <Row>
        <Col span={8}>
        <FormItem
          label="姓名"
        >
          {getFieldDecorator('memberName', {
            initialValue: currentItem.memberName,
            rules: [{
              required: true, message: '必填',
            }],
          })(
            <Input/>
          )}
        </FormItem>
        </Col>
        <Col span={8}>
        <FormItem
          label="手机号"
        >
          {getFieldDecorator('mobile', {
            initialValue: currentItem.mobile,
            rules: [{required: true, message: '请输入手机号!'}],
          })(
            <Input/>
          )}
        </FormItem>
        </Col>
        <Col span={8}>
        <FormItem
          label="性别"
        >
          {getFieldDecorator('gender', {
            initialValue: currentItem.gender,
            rules: [{required: true, message: '请选择性别!'}],
          })(
            <Select allowClear={true}>
              {options}
            </Select>
          )}
        </FormItem>
        </Col>
        <Col span={8}>
        <FormItem
          label="生日"
        >
          {getFieldDecorator('birthday', {
            initialValue: moment(currentItem.birthday),
            rules: [{required: true, message: '请选择生日!'}],
          })(
            <DatePicker allowClear={true} showToday={false} placeholder=""/>
          )}
        </FormItem>
        </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Form.create()(Dialog)
