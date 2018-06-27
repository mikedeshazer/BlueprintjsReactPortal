
import React from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requesturl } from '../../common/constant'
import axios from "axios";
import FlatButton from 'material-ui/FlatButton';

export class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm: ""
    }
  }

  // Handles Changing Password
  handleClick = () => {
    // if new & confirm password matches
    if (this.state.password === this.state.confirm) {
      // Get new Password
      var payload = {
        "password": this.state.password
      }
      // Set headers for API Request
      let headers = {
        headers: { Authorization: localStorage.getItem("token") }
      };
      // API Request
      axios.post(requesturl + 'api/v1/changepassword', payload, headers)
        .then((response) => {
          if (response.data.status === 200) {
            alert("Password Successfully Changed")
            this.props.history.push("home");
          }
        })
        .catch(function (error) {
          alert("Password change Unsuccessful")
          console.log(error);
        });

    } else {
      alert("Passwords do not match. Please try again.")
    }
  }

  // Handles Log Out Event
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
      <div className="login-page">
        <AppBar
          title="Change Password"
          iconElementRight={rightButtons}
        />
        <div className="login">
          <TextField
            type="password"
            floatingLabelText="New Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <TextField
            type="password"
            floatingLabelText="Confirm Password"
            onChange={(event, newValue) => this.setState({ confirm: newValue })}
          />
          <RaisedButton className="submit-btn" label="Submit" primary={true} style={style} onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
