import React from 'react';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute
} from 'react-router';

// Layouts
import MainLayout from './components/main-layout';
import SearchLayout from './components/search-layout';

// Pages
import Home from './components/home';
import Authorization from './components/authorization';
import UserProfile from './components/user-profile';
import NotFound from './components/not-found';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />

      <Route path="login" component={Authorization} />

      <Route path="user/:userId" component={UserProfile} />

    </Route>

    <Route path="*" component={NotFound}/>
  </Router>
);
