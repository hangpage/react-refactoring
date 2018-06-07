import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Link } from 'dva/router';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MainTab from '../components/common/MainTab'
import User from './user';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function IndexPage({location, dispatch, app}) {

  const {
    panes,
    newTabIndex,
    activeKey
  } = app;

  const tabProps = {
    panes: panes,
    newTabIndex: newTabIndex,
    activeKey: activeKey,
    addTab(){
      dispatch({
        type: 'app/addTab',
      })
    },

    removeTab(targetKey){
      dispatch({
        type: 'app/removeTab',
        payload: {
          targetKey: targetKey,
        }
      })
    },
    changeTab(targetKey){
      dispatch({
        type: 'app/changeTab',
        payload: {
          targetKey: targetKey
        }
      })
    }
  }

  const onMenuItemClick = (e) => {
    const item = {
      title: '用户列表',
      key: '2',
      content: <User />
    }
    
    if(_.find(panes, {key: item.key})){
        return false;
    }

     dispatch({
       type: 'app/addTab',
       payload: item
     })
  }

  return (
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={onMenuItemClick}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">
                  用户列表
                  {/*<Link to="/user">用户列表</Link>*/}
                </Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 'calc(100vh - 112px)'}}>
              <MainTab { ...tabProps }/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps({app}) {
  return { app }
}

export default connect(mapStateToProps)(IndexPage);
