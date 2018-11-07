import React from 'react';
import request from '../../utils/request'
import PropTypes from 'prop-types';
import {Select} from 'antd';

const Option = Select.Option;

class ComboBox extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
      }
  }

  getOptions(options) {
    const ops = [];
    const {valueProp, nameProp} = this.props;
    for (let i = 0; i < options.length; i++) {
      ops.push(<Option key={i} value={options[i][valueProp] || options[i]['id']}>{options[i][nameProp] || options[i]['name']}</Option>)
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

  handleChange = (value) => {
    const onChange = this.props.onChange;
    this.setState({
      value: value
    })
    if (onChange) {
      onChange(value);
    }
  }

  filterOption = (input, option) => {
    return option.props.children.indexOf(input) !== -1;
  }

  render() {
    return (
      <div style={this.props.style}>
          <Select onChange={this.handleChange}
                  allowClear={this.props.allowClear || true}
                  showSearch={this.props.showSearch || true}
                  filterOption={this.filterOption}
                  style={{width: '100%'}}
                  dropdownMatchSelectWidth={true}>
            {this.getOptions(this.state.dataSource)}
          </Select>
      </div>
    )
  }
}

ComboBox.propTypes = {
    url: PropTypes.string,
    valueProp: PropTypes.string,
    text: PropTypes.string,
    allowClear: PropTypes.bool,
    showSearch: PropTypes.bool
}

export default ComboBox;
