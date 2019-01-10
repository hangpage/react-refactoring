import React from 'react';
import {Timeline, Icon} from 'antd'
import fetch from 'dva/fetch';
import Skeleton from "antd/es/skeleton";

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/hangpage/react-refactoring/commits').then(res => res.json()).
    then(res => {
      this.setState({
        data: res,
        loading: false
      })
    })
  }

  render() {
    const {data, loading} = this.state;
    const colorList = ['blue', 'red', 'green', 'yellow'];
    const timelines = data.map((d, index) =>
      (<Timeline.Item key={index} color={colorList[index % 4]} dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>}>
        {d.commit.message}
        <br />
        {d.commit.author.name}
        &nbsp;
        {d.commit.author.date}
      </Timeline.Item>)
    );
    return (
      <div>
        <Timeline mode="alternate">
            {/*<Skeleton loading={loading} active>*/}
              {/*{timelines}*/}
            {/*</Skeleton>*/}
          {timelines}
        </Timeline>
      </div>
    )
  }
}

export default Github;
