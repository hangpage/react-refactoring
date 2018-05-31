import React from 'react';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import ComboBox from '../common/ComboBox'
import css from './UserSearch.less'
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const fieldList = this.props.queryFieldList;
    for (let i = 0; i < fieldList.length; i++) {
      if(fieldList[i].type === 'combobox'){
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`${fieldList[i].text}`}>
              {getFieldDecorator(`${fieldList[i].field}`, {
                rules: [{
                  required: true,
                  message: 'Input something!',
                }],
              })(
                <ComboBox options={fieldList[i].datasource}/>
              )}
            </FormItem>
          </Col>
        );
      }else{
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`${fieldList[i].text}`}>
              {getFieldDecorator(`${fieldList[i].field}`, {
                rules: [{
                  required: true,
                  message: 'Input something!',
                }],
              })(
                <Input placeholder="请填写" />
              )}
            </FormItem>
          </Col>
        )
      }

    }
    return children;
  }

  render() {
    return (
      <div>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">Search</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AdvancedSearchForm);

