import React from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { requesturl } from '../../common/constant'
import axios from "axios";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  // Handles navigation to Login Page
  login = () => {
    this.props.history.push("login");
  }

  // Handles Registrations
  handleClick = () => {
    // get details of user
    var payload = {
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "email": this.state.email,
      "password": this.state.password,
    }
    // API Request
    axios.post(requesturl + 'api/v1/register', payload)
      .then((response) => {
        if (response.data.status === 200) {
          this.props.history.push("login");
        }
      })
      .catch(function (error) {
        alert("Registration Unsuccessful");
        console.log(error);
      });
  }

  render() {
    return (
      <div className="login-page">
        <AppBar
          title="Register"
        />
        <div className="login page">
          <TextField
            type="text"
            floatingLabelText="First Name"
            onChange={(event, newValue) => this.setState({ first_name: newValue })}
          />
          <TextField
            type="text"
            floatingLabelText="Last Name"
            onChange={(event, newValue) => this.setState({ last_name: newValue })}
          />
          <TextField
            type="email"
            floatingLabelText="Email"
            onChange={(event, newValue) => this.setState({ email: newValue })}
          />
          <TextField
            type="password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <RaisedButton label="Submit" className="submit-btn" primary={true} style={style} onClick={this.handleClick} />

          <div className="login-register">
            <button onClick={this.login}> Login </button>
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
