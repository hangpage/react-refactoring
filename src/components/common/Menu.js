import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { connect } from 'dva';
import _ from 'lodash';
import  { arrayToTree } from '../../utils/index';

const Menus = ({dispatch, menus}) => {
  const menuTree = arrayToTree(menus.filter(_ => _.resourceType !== 'b'), 'id', 'parentId');
  console.log(menuTree)


  console.log(dispatch, menuTree)


  //TODO 处理这个数据的时机有点问题
  if(menuTree){
    dispatch({
      type: 'menu/changeCurrentMenuItemChildren',
      payload: {
        currentMenuItemChildren: menuTree[0] && menuTree[0].children || []
      }
    })
  }

  const onMenuItemClick = ({ item, key, keyPath }) => {
    dispatch({
      type: 'menu/onMenuItemClick',
      payload: {
        currentMenuItemChildren: _.find(menuTree, {id: key}).children || []
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
  return {
    menus: menu.menus
  };
}


export default connect(mapStateToProps)(Menus);;
