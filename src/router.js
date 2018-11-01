import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import APP from './routes/APP';
import Users from './routes/user';
import Indexpage from './routes/indexpage';
import Echarts from './routes/echarts'
import Login from './routes/login';
import Test from './routes/test';


function RouterConfig({history}) {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <APP>
              <Route path="/" exact component={Indexpage}/>
              <Route path="/html/member/info/main.html" exact component={Users}/>
              <Route path="/html/member/protocol/main.html" exact component={Test}/>
            </APP>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
