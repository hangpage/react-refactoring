import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import request from '../../utils/request';
import isEqual from 'lodash.isequal'
import {Map, List, fromJS} from 'immutable';
import {toJs} from '../hoc/ToJs';
import qs from 'qs';
import styles from '../../index.less';


class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
      params: {},
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showSizeChanger: props.showSizeChanger || true,
        showQuickJumper: props.showQuickJumper || true
      }
    }
  }

  componentDidMount() {
    if (this.props.url) {
      this.fetch()
    }
  }

  onPageChange = (pagination, filters, sorter) => {
    this.setState({
      pagination: pagination
    }, () => {
      this.fetch()
    })
  }

  fetch = (params) => {
    if(params){
      params = Object.assign({}, params, {pageSize: this.state.pagination.pageSize, pageNum: this.state.pagination.current});
    }else{
      params = {pageSize: this.state.pagination.pageSize, pageNum: this.state.pagination.current};
    }
    this.setState({loading: true});
    const url = this.props.url;
    const that = this;
    this.propmise = request(`${url}?${qs.stringify(params)}`).then(({data}) => {
      this.setState({
          loading: false,
          params: params,
          dataSource: data.data,
          pagination: Object.assign({},that.state.pagination, {total: data.total, current: params.pageNum})
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState){ //优化组件 尽量进行最小化的render
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  componentWillReceiveProps(nextProps){
    // const params = {...nextProps.params, ...{pageNum: 1, pageSize: this.state.pagination.pageSize}};
    // if(!isEqual(this.props, nextProps)){
    //   this.props = nextProps;
    //   this.fetch(params);
    // }
    this.setState({
      dataSource: nextProps.dataSource
    })
  }

  render() {
    const {columns} = this.props;
    const {dataSource, pagination, loading} = this.state;
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        locale={{emptyText: '暂无数据'}}
        rowKey={record => record.id}
        pagination={pagination}
        size="small"
        loading={loading}
        className={styles.mt10}
        onChange={this.onPageChange}
      />
    )
  }

}


DataTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  onChange: PropTypes.func
}

export default DataTable;
