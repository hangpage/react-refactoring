import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { connect } from 'dva';
import { Link } from 'dva/router'
import _ from 'lodash';
import  { arrayToTree } from '../../utils/index';
const { SubMenu } = Menu;

const Menus = ({currentMenuItemChildren, onSiderMenuItemClick}) => {

  //递归处理菜单
  const getMenus = (tree) => {
    return tree.map((item) => {
      if(item.children){
        return (
          <SubMenu key={item.id} title={<span><Icon type="user" />{item.name}</span>}>
            {getMenus(item.children)}
          </SubMenu>
        )
      }
      item.url = '/user';
      return(
        <Menu.Item key={item.id}>
          <Link to={item.url}>
            {item.name}
          </Link>
        </Menu.Item>
      )
    })
  }

  const menuItems = getMenus(currentMenuItemChildren);

  return(
    <div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        onClick={onSiderMenuItemClick}
      >
        {menuItems}
      </Menu>
    </div>
  )
}


export default Menus;
