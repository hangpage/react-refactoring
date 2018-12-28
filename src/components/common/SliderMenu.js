import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
const { SubMenu } = Menu;

const SlideMenu = ({currentMenuItemChildren, onSiderMenuItemClick, changeTheme, theme}) => {

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
        <Menu.Item key={item.id}>
          <Link to={item.url}>
            {item.icon ? <Icon type={item.icon} /> : <Icon type="meh" />}
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
        theme={theme}
      >
        {menuItems}
      </Menu>
    </div>
  )
}

SlideMenu.propTypes = {
  onClick: PropTypes.func
}


export default SlideMenu;
