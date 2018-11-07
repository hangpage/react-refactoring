import React from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Link} from 'dva/router';
import styles from './IndexPage.css';
import {Layout, Menu, Tabs, Switch} from 'antd';
import MainTab from '../components/common/MainTab'
import HeaderMenu from '../components/common/HeaderMenu';
import SliderMenu from '../components/common/SliderMenu';
import Components from './index';


const TabPane = Tabs.TabPane;
const {Header, Content, Sider} = Layout;


function APP({children, location, dispatch, app}) {

  const {
    panes,
    newTabIndex,
    activeKey,
    menus,
    currentMenuItemChildren,
    menuTreeData,
    theme
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

  const changeTheme = (value) => {
    dispatch({
      type: 'app/changeTheme',
      payload: {
        theme: value ? 'light' : 'dark'
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

  const onEdit = (targetKey, action) => {
    if(action === 'remove'){
        tabProps.removeTab(targetKey);
    }
  }

  const renderTabBar = (pane) => {
    return (
      <Link to="/">
        很棒
      </Link>
    )
  }

  //TODO use renderTabBar to create Link to update current pane
  return (
    <div>
      <Layout>
        <Header className="header">
          <div className={styles.logo}/>
          <HeaderMenu menus={menus} onHeaderMenuItemClick={onHeaderMenuItemClick}/>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <SliderMenu currentMenuItemChildren={currentMenuItemChildren} onSiderMenuItemClick={onSiderMenuItemClick} theme={theme}/>
            <Switch onChange={changeTheme} checkedChildren="黑" unCheckedChildren="白" defaultChecked/>
          </Sider>
          <Layout style={{padding: '24px'}}>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 'calc(100vh - 112px)'}}>
              {/*<MainTab {...tabProps}/>*/}
              {/*<Tabs*/}
                {/*hideAdd*/}
                {/*onChange={tabProps.changeTab}*/}
                {/*activeKey={tabProps.activeKey}*/}
                {/*type="editable-card"*/}
                {/*onEdit={onEdit}*/}
              {/*>*/}
                {children}
                {/*
                  提取children
                */}
                {/*{ panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{children}</TabPane>) }*/}
              {/*</Tabs>*/}
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
