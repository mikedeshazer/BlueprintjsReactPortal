import React from "react";
import { Login, Register, Home, EditProfile, Password } from "./Components/";
import { Route, Switch, Redirect } from "react-router-dom";

export default class Routes extends React.Component {
	render() {
	const PrivateRoute = ({ component: Component}) =>
  	<Route
    render={props =>
      localStorage.getItem("token")
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
		  />}
  	/>;
		return (
			<Switch>
				<Route exact={ true } path='/' component={ Login }/>
				<Route exact={ true } path='/login' component={ Login }/>
				<Route exact={ true } path='/register' component={ Register }/>
				<PrivateRoute exact={ true } path='/home' component={ Home }/>
				<PrivateRoute exact={ true } path='/edit-profile' component={ EditProfile }/>
				<PrivateRoute exact={ true } path='/change-password' component={ Password }/>
			</Switch>
		);
	}
}
