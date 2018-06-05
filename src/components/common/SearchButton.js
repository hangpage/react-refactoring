import React from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

class SearchButton extends React.Component {

  toggle = () => {
    this.props.collapseClick()
  }

  render() {
    return (
      <div>
        <Button type="primary" htmlType="submit">搜索</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.props.handleReset}>重置</Button>
        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
          {this.props.expand ? '收起' : '展开'} <Icon type={this.props.expand ? 'up' : 'down'} />
        </a>
      </div>
    )
  }
}

SearchButton.propTypes = {
  handleReset: PropTypes.func,
}

export default SearchButton;
