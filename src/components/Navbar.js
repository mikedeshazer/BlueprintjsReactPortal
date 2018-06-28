import React from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends React.Component{

  render(){
    return(
      <nav className="pt-navbar .modifier pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Blueprint</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Link to="/"><button className="pt-button pt-minimal pt-icon-log-in" >Login</button></Link>
          <Link to="/signup"><button className="pt-button pt-minimal pt-icon-document">Signup</button></Link>

        </div>
      </nav>
    )
  }
}
