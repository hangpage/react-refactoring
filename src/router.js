import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import createHistory from 'history/createBrowserHistory';
import APP from './routes/APP';
import USER from './routes/user';
import Login from './routes/login';


function RouterConfig({history}) {
  return (
    <Router history={history}>
      <div>
        <Route path="/login" exact component={Login}/>
        <APP>
          <Route path="/user" component={USER}/>
        </APP>
      </div>
    </Router>
  );
}

export default RouterConfig;
