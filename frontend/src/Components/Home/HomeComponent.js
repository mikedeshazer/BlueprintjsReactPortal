
import React from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export class Home extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  // Handles Log Out Event
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  // Handles navigation to Edit Page
  editProfile = () => {
    this.props.history.push("edit-profile");
  }

  render() {
    const buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white'
    };
    const rightButtons = (
      <div>
        <FlatButton label="Log Out" style={buttonStyle} onClick={this.handleLogout} />
      </div>
    );
    return (
      <div className="home-page">
          <AppBar
            title="Home"
            iconElementRight={rightButtons}
          />
          <div className="container"> 
            <div className="inner"> 
              <h1>Welcome to Home</h1>
              <p> Click on the following button to Edit your Profile. </p>
              <RaisedButton className="submit-btn" label="Edit Profile" primary={true} style={style} onClick={this.editProfile} />
            </div>
          </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};