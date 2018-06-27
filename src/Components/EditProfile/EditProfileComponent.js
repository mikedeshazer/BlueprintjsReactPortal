
import React from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requesturl } from '../../common/constant'
import axios from "axios";
import FlatButton from 'material-ui/FlatButton';

export class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name
    }
  }

  // Handles Modifications of Profile
  handleClick = () => {
    // Get profile details of user
    var payload = {
      "first_name": this.state.first_name,
      "last_name": this.state.last_name
    };
    // Set token as header for API Request
    let headers = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    // API Request
    axios.post(requesturl + 'api/v1/edit', payload, headers)
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.props.history.push("home");
        }
      })
      .catch(function (error) {
        alert("Changes could not be Saved")
        console.log(error);
      });
  }

  // Handles Log Out Event
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  // Handles Navigation to Password Page
  changePassword = () => {
    this.props.history.push("change-password");
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
      <div className="login-page edit-profile">
        <AppBar
          title="Edit Profile"
          iconElementRight={rightButtons}
        />
        <div className="container-fluid">
          <div className="login-password">
            <RaisedButton className="password-btn" label="Change Password" primary={true} style={style} onClick={this.changePassword} />
          </div>

          <div className="login">
            <TextField
              value={this.state.first_name}
              floatingLabelText="First Name"
              onChange={(event, newValue) => this.setState({ first_name: newValue })}
            />
            <TextField
              value={this.state.last_name}
              floatingLabelText="Last Name"
              onChange={(event, newValue) => this.setState({ last_name: newValue })}
            />
            <RaisedButton className="submit-btn" label="Save Changes" primary={true} style={style} onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
