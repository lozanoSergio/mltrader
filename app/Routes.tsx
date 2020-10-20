/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './containers/App';

// Lazily load routes and code split with webpack
const LazyDashboard = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './layouts/Dashboard')
);

const DashboardPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyDashboard {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path="/dashboard" render={DashboardPage} />
        <Redirect from="/" to="/dashboard/overview" />
      </Switch>
    </App>
  );
}
