import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import CallBox from './components/BrowserCall.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={CallBox}>
    </Route>
  </Router>
);
