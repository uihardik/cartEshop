import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import store from '../store/store';
import {clearError} from '../actions'

/* Page */
import Home from '../containers/Home'
import Dashboard from '../containers/Dashboard'


class Routes extends Component {

  render() {
    return (
      <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    );
  }
}

//Private router function
const {loggedIn} = store.getState();
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
    />
  );
};

export default Routes;
