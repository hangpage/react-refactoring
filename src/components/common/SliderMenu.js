import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { connect } from 'dva';
import _ from 'lodash';
import  { arrayToTree } from '../../utils/index';
const { SubMenu } = Menu;

const Menus = ({currentMenuItemChildren}) => {
  console.log(currentMenuItemChildren)


  //TODO 递归处理
  const itemList = currentMenuItemChildren && currentMenuItemChildren.map(item => <SubMenu key={item.id} title={<span><Icon type="user" />{item.name}</span>}>{item.children && item.children.map(child => <Menu.Item key={child.id}></Menu.Item>)}</SubMenu>);
  return(
    <div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {itemList}
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
