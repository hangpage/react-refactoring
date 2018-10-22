import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import request from '../../utils/request';
import qs from 'qs';
import styles from '../../index.less';


class DataTable extends React.Component {
  constructor(props){
    super(props);
    const pagination = props.pagination || {
      pageNum: 1,
      pageSize: 20,
    };
    this.state = {
      loading: false,
      dataSource: [],
      fetchData: {},
      pagination,
    }
  }

  componentDidMount () {
    //TODO 根据是否带有url来判断是否自动加载表格数据
    if (this.props.url) {
      this.fetch()
    }
  }

  onPageChange = (pagination, filters, sorter) => {
    // this.setState({
    //   pagination: {
    //     pageNum: pagination.current,
    //     pageSize: pagination.pageSize
    //   }
    // }, () => {
    //   this.fetch()
    // })

    this.setState({
      pagination: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      }
    })
  }

  fetch = () => {
    const url = this.props.url;
    const params = {...this.props.params, ...this.state.pagination} || {};
    this.setState({loading: true});
    this.propmise = request(`${url}?${qs.stringify(params)}`,{
      method: 'GET',
      headers: new Headers(),
      credentials: "include"
    }).then(({data}) => {
      const {pagination} = this.state;
      pagination.total = data.total;
      this.setState({
        loading: false,
        dataSource: data.data,
        pagination
      })
    })
  }

  render () {
    const { loading, pagination } = this.state;
    const { columns } = this.props;
    const {dataSource} = this.props;
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        locale={{emptyText: '暂无数据'}}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
        size="small"
        className={styles.mt10}
        onChange={this.onPageChange}
      />
    )
  }

}


DataTable.propTypes = {

}

export default DataTable
