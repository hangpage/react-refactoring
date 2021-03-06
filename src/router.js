import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import APP from './routes/APP';
import Users from './routes/user';
import Uncash from './routes/cashier/uncash';
import Indexpage from './routes/indexpage';
import Echarts from './routes/echarts'
import Login from './routes/login';
import Test from './routes/test';
import settle from './routes/cashier/uncash/settle';
import Github from "./routes/github";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <div style={{height: '100%'}}>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <APP>
            <Route path="/" exact component={Uncash}/>
            <Route path="/html/member/info/main.html" exact component={Users}/>
            <Route path="/html/member/protocol/main.html" exact component={Test}/>
            <Route path="/html/cash/uncash/main.html" exact component={Uncash}/>
            <Route path="/uncash/settle" exact component={settle}/>
            <Route path='/github/history' exact component={Github}/>
          </APP>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
