import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

const loading = () => <div>loading</div>
const NoMatch = Loadable({ loader: () => import('./screens/404/index'), loading });
const Faq = Loadable({ loader: () => import('./screens/help/faq/index'), loading });

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/help" component={Faq} />
          <Redirect from="/" to="/help" />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
