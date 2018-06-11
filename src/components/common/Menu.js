import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { connect } from 'dva';
import _ from 'lodash';
import  { arrayToTree } from '../../utils/index';

const Menus = ({location, dispatch, menu}) => {
  const { menus } = menu;
  const menuTree = arrayToTree(menus, 'id', 'parentId');
  console.log(menuTree)

  const onMenuItemClick = ({ item, key, keyPath }) => {
    dispatch({
      type: 'menu/onMenuItemClick',
      payload: {
        currentMenuItemChildren: _.find(menuTree, {id: key}).children
      }
    })
  }

  const itemList = menuTree.map(item => <Menu.Item key={item.id}>{item.name}</Menu.Item>)
    return(
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['01']}
          style={{ lineHeight: '64px' }}
          onClick={onMenuItemClick}
        >
          {itemList}
        </Menu>
      </div>
    )
}


function mapStateToProps({menu}) {
  return {menu};
}


export default connect(mapStateToProps)(Menus);;
