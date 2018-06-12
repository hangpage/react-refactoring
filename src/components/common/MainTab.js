import React from 'react';
import { Tabs } from 'antd';
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


export default MainTab;
