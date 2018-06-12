import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { connect } from 'dva';
import _ from 'lodash';
import  { arrayToTree } from '../../utils/index';

const Menus = ({menus, onHeaderMenuItemClick}) => {
  const menuTree = arrayToTree(menus.filter(_ => _.resourceType !== 'b'), 'id', 'parentId');

  const itemList = menuTree.map(item => <Menu.Item key={item.id}>{item.name}</Menu.Item>)
    return(
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['01']}
          style={{ lineHeight: '64px' }}
          onClick={onHeaderMenuItemClick}
        >
          {itemList}
        </Menu>
      </div>
    )
}


export default Menus;
