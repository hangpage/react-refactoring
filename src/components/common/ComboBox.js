import React from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import {Select} from 'antd';

const Option = Select.Option;

class ComboBox extends React.Component {
  state = {
    value: ''
  }
  getOptions(options) {
    const ops = [];
    for (let i = 0; i < options.length; i++) {
      const {id, value} = options[i];
      ops.push(<Option key={i} value={id}>{value}</Option>)
    }
    return ops;
  }

  handleChange = (value) => {
    this.setState({
      value
    })
    this.triggerChange({value})
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    return (
      <div>
        <Select defaultValue="" onChange={this.handleChange}>
          {this.getOptions(this.props.options)}
        </Select>
      </div>
    )
  }
}

ComboBox.propTypes = {}

export default ComboBox;
