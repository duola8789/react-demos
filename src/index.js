import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './views/Layout';
import { routes } from '@/router';

import './index.css';
import 'antd/dist/antd.css';

// 路由设置
function RouterContainer() {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} key={route.path} exact />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
}

ReactDOM.render(<RouterContainer />, document.getElementById('root'));
