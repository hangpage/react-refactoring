import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { connect } from 'dva';
import _ from 'lodash';
import  { arrayToTree } from '../../utils/index';
const { SubMenu } = Menu;

const Menus = ({currentMenuItemChildren}) => {
  console.log(currentMenuItemChildren)


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
      return(
        <Menu.Item key={item.id}>{item.name}</Menu.Item>
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
      >
        {menuItems}
      </Menu>
    </div>
  )
}


function mapStateToProps({menu}) {
  //TODO 这里只return currentMenuItemChild的话 上面Menus在哪里取呢？
  // 只返回相对应的currentMenuItemChild相当于只给组件注入一个props也就是一个参数，这样就可以直接在上面的组件中取到这个参数
  return {
    currentMenuItemChildren: menu.currentMenuItemChildren
  };
}


export default connect(mapStateToProps)(Menus);;
