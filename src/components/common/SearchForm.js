import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd';
import SearchButton from './SearchButton';
import ComboBox from './ComboBox';
import styles from '../../index.less';
const FormItem = Form.Item;

class SearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.onSearch({...this.props.form.getFieldsValue()});
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    const fieldList = this.props.queryFieldList;
    for (let i = 0; i < fieldList.length; i++) {
      if(fieldList[i].type === 'select'){
        let options = [];
        if(fieldList[i].datasource){
          options = fieldList[i].datasource.map(item => <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>);
        }
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`${fieldList[i].text}`}>
              {getFieldDecorator(`${fieldList[i].field}`, {
                initialValue: fieldList[i].defaultValue,
              })(
                <Select allowClear={true}>
                  {options}
                </Select>
              )}
            </FormItem>
          </Col>
        );
      }else if(fieldList[i].type === 'combobox'){
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`${fieldList[i].text}`}>
              {getFieldDecorator(`${fieldList[i].field}`,{
                initialValue: fieldList[i].defaultValue
              })(
                <ComboBox url={fieldList[i].url} valueProp={fieldList[i].valueProp} nameProp={fieldList[i].nameProp}/>
              )}
            </FormItem>
          </Col>
        );
      }else if(fieldList[i].type === 'datepicker'){
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`${fieldList[i].text}`}>
              {getFieldDecorator(`${fieldList[i].field}`,{
                initialValue: fieldList[i].defaultValue
              })(
                <DatePicker showTime format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
        );
      }else{
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`${fieldList[i].text}`}>
              {getFieldDecorator(`${fieldList[i].field}`, {
                initialValue: fieldList[i].defaultValue,
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
            <Col span={24} className={ styles.lyb_flex_sb }>
              <Button type="primary" onClick={this.props.onCreat}>新增</Button>
              <SearchButton handleReset={this.handleReset} collapseClick={this.toggle} expand={this.state.expand} />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
  queryFieldList: PropTypes.array.isRequired
}

export default Form.create()(SearchForm);

