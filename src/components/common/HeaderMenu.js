import React from 'react';
import PropTypes from 'prop-types'
import { Menu } from 'antd'
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
          style={{ lineHeight: '64px', display: 'flex',flexWrap:'wrap' }}
          onClick={onHeaderMenuItemClick}
        >
          {itemList}
        </Menu>
      </div>
    )
};

Menus.propTypes = {
  menus: PropTypes.array.isRequired,
  onHeaderMenuItemClick: PropTypes.func
};

export default Menus;
