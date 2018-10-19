import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import createHistory from 'history/createBrowserHistory';
import APP from './routes/APP';
import Users from './routes/user';
import Indexpage from './routes/indexpage';
import Login from './routes/login';


function RouterConfig({history}) {
  return (
    <Router history={history}>
      <div>
        <Switch>
            <Route path="/login" exact component={Login}/>
            <APP>
              <Route path="/" exact component={Indexpage}/>
              <Route path="/html/member/info/main.html" exact component={Users}/>
            </APP>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
