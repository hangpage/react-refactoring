import React from 'react';
import { Router, Route, Switch, browserHistory } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
