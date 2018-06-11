import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Link } from 'dva/router';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MainTab from '../components/common/MainTab'
import User from './user';
import Menus from '../components/common/Menu';
import SliderMenu from '../components/common/SliderMenu';
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
          <div className={styles.logo} />
          <Menus />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <SliderMenu />
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
