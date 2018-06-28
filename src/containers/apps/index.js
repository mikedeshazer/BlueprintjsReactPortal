
import React from 'react';
import Login from '../Login'
import Signup from '../signup'
import { connect } from 'react-redux'
import { Route, Switch,BrowserRouter,Redirect } from 'react-router-dom'
import Dashboard from '../../containers/Dashboard'
import EditProfile from '../../containers/EditProfile'

const checkAuth = () =>{
	const token = localStorage.getItem('token');
	return !!token
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{ pathname: '/'}} />

    )
  )}/>
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    return checkAuth() ? (
      <Redirect to={{ pathname: `/dashboard` }} />
    ) :
      (
        <Component {...props} />
      )
  }} />
)

export default class Apps extends React.Component{
  render(){
    return(
      <div>

        <BrowserRouter>
            <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <AuthRoute path="/dashboard" component={props=><Dashboard {...props} />} />
						<AuthRoute path="/editprofile" component={props=><EditProfile {...props} />} />


          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
// export default connect(
// state => (
//   {
//
//   },
//   mapDispatch
// )
// )(Apps)
//
// const mapDispatch = dispatch => {
// const allActionProps = Object.assign({}, dispatch)
// return allActionProps
// }
