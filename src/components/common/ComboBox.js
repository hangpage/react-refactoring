import React from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;

class ComboBox extends React.Component {

  getOptions(options){
      const ops = [];
      for (let i = 0; i < options.length; i++) {
        const {id, value} = options[i];
        ops.push(<Option key={i} value={id}>{value}</Option>)
      }
      return ops;
  }
  render() {
  return (
      <div>
        <Select defaultValue="" >
        {this.getOptions(this.props.options)}
        </Select>
      </div>
  )
  }
}

ComboBox.propTypes = {

}

export default ComboBox;
