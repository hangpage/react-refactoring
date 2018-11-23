import React from 'react';

import {
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  DatePicker
} from 'antd';
import dict from '../../../utils/dictionary';
import SysUrlConst from '../../../utils/SysUrlConst';
import moment from 'moment';
import pinyinUtil from 'ipinyinjs';
import isEqual from 'lodash.isequal';
import ComboBox from '../../../components/common/ComboBox';


const genderOptions = dict.sex.map(item => <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>);
const FormItem = Form.Item;

const colSan = {
  xl: { span: 6 },
  md: { span: 8 },
  xs: { span: 1 }
}

class Dialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentItem: this.props.currentItem || {},
      modalType: this.props.modalType,
      modalVisible: this.props.modalVisible
    };
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    let {modalType, modalVisible, currentItem} = nextProps;
    currentItem = currentItem || {};
    const state = Object.assign({}, this.state, {modalType, modalVisible, currentItem});
    this.setState(state)
  }
  shouldComponentUpdate(nextProps, nextState){
    if(isEqual(this.props, nextProps) && isEqual(this.state, nextState)){
      return false;
    }
    return true;
  }
  handNameInputChange = (e) => {
    this.props.form.setFieldsValue;({
      pinyinCode: pinyinUtil.getFirstLetter(e.target.value)
    })
  }
  handleOk(){
    const {getFieldsValue} = this.props.form;
    const {onModalOkClick} = this.props;
    const value = getFieldsValue();
    value.birthday = value.birthday.format('YYYY-MM-DD');
    onModalOkClick(value);
  }
  render(){
    const {getFieldDecorator, validateFields, setFieldsValue} = this.props.form;
    const {onModalCancelClick, handleOk} = this.props;
    const {modalVisible, modalType, currentItem} = this.state;
    return(
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
          <Row gutter={16}>
            <Col {...colSan}>
              <FormItem
                label="姓名"
              >
                {getFieldDecorator('memberName', {
                  initialValue: currentItem.memberName,
                  rules: [{
                    required: true, message: '必填',
                  }],
                })(
                  <Input onChange={this.handNameInputChange}/>
                )}
              </FormItem>
            </Col>
            <Col {...colSan}>
              <FormItem
                label="姓名拼音码"
              >
                {getFieldDecorator('pinyinCode', {
                  initialValue: currentItem.pinyinCode,
                  rules: [{required: true}],
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col {...colSan}>
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
            <Col {...colSan}>
              <FormItem
                label="性别"
              >
                {getFieldDecorator('gender', {
                  initialValue: currentItem.gender,
                  rules: [{required: true, message: '请选择性别!'}],
                })(
                  <Select allowClear={true}>
                    {genderOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...colSan}>
              <FormItem
                label="生日"
              >
                {getFieldDecorator('birthday', {
                  initialValue: currentItem.birthday ? moment(currentItem.birthday) : moment(new Date()),
                  rules: [{required: true, message: '请选择生日!'}],
                })(
                  <DatePicker allowClear={true} showToday={false} placeholder=""/>
                )}
              </FormItem>
            </Col>
            <Col {...colSan}>
              <FormItem
                label="客人级别"
              >
                {getFieldDecorator('memberLevel', {
                  initialValue: currentItem.memberLevel,
                  rules: [{required: true, message: '请选择客人级别!'}],
                })(
                  <ComboBox url={SysUrlConst.SYS_MEMBER_LEVEL} nameProp="levelName"/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Dialog)
