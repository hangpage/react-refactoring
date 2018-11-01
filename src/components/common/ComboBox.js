import React from 'react';
import ReactDom from 'react-dom'
import request from '../../utils/request'
import PropTypes from 'prop-types';
import {Select} from 'antd';

const Option = Select.Option;

class ComboBox extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: []
      }
  }

  getOptions(options) {
    const ops = [];
    const {value, text} = this.props;
    for (let i = 0; i < options.length; i++) {
      ops.push(<Option key={i} value={options[i][value]}>{options[i][text]}</Option>)
    }
    return ops;
  }

  componentDidMount(){
    if(this.props.url){
        this.promise = request(this.props.url).then(({data}) => {
          this.setState({
            dataSource: data.data
          })
        })
    }
  }

  handleChange = (identityType) => {
    this.setState({
      identityType
    })
    this.triggerChange({identityType})
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
          {this.getOptions(this.state.dataSource)}
        </Select>
      </div>
    )
  }
}

ComboBox.propTypes = {}

export default ComboBox;
