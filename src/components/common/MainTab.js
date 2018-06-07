import React from 'react';
import { connect } from 'dva';
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;



class MainTab extends React.Component {

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  remove = (targetKey) => {
    this.props.removeTab(targetKey);
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.props.addTab}>新增页签</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.props.changeTab}
          activeKey={this.props.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.props.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}


export default connect()(MainTab);
