import React from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Link} from 'dva/router';
import styles from './IndexPage.css';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import MainTab from '../components/common/MainTab'
import HeaderMenu from '../components/common/HeaderMenu';
import SliderMenu from '../components/common/SliderMenu';
import Components from './index';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


function APP({children, location, dispatch, app}) {

  const {
    panes,
    newTabIndex,
    activeKey,
    menus,
    currentMenuItemChildren,
    menuTreeData
  } = app;

  const tabProps = {
    panes: panes,
    newTabIndex: newTabIndex,
    activeKey: activeKey,
    addTab() {
      dispatch({
        type: 'app/addTab',
      })
    },

    removeTab(targetKey) {
      dispatch({
        type: 'app/removeTab',
        payload: {
          targetKey: targetKey,
        }
      })
    },
    changeTab(targetKey) {
      dispatch({
        type: 'app/changeTab',
        payload: {
          targetKey: targetKey
        }
      })
    }
  }

  const onHeaderMenuItemClick = ({item, key, keyPath}) => {
    dispatch({
      type: 'app/onMenuItemClick',
      payload: {
        currentMenuItemChildren: _.find(menuTreeData, {id: key}).children || []
      }
    })
  }

  const onSiderMenuItemClick = ({key, keyPath, item}) => {
    const tab = {
      title: item.props.children,
      key: key,
      content: Components[key]
    }
    if (_.find(panes, {key: tab.key})) {
      dispatch({
        type: 'app/changeTab',
        payload: {
          targetKey: tab.key
        }
      })
    } else {
      dispatch({
        type: 'app/addTab',
        payload: tab
      })
    }
  }


  return (
    <div>
      <Layout>
        <Header className="header">
          <div className={styles.logo}/>
          <HeaderMenu menus={menus} onHeaderMenuItemClick={onHeaderMenuItemClick}/>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <SliderMenu currentMenuItemChildren={currentMenuItemChildren} onSiderMenuItemClick={onSiderMenuItemClick}/>
          </Sider>
          <Layout style={{padding: '24px'}}>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 'calc(100vh - 112px)'}}>
              {/*<MainTab {...tabProps}/>*/}
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

APP.propTypes = {};

function mapStateToProps({app}) {
  return {app}
}

export default connect(mapStateToProps)(APP);
