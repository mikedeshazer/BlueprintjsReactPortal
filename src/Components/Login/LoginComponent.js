import React from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { requesturl } from '../../common/constant'
import TextField from 'material-ui/TextField';
import axios from "axios";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  // Handles navigation to Register Page
  register = () => {
    this.props.history.push("register");
  }

  // Handles Login
  handleClick(event) {
    // get login details from user
    var payload = {
      "email": this.state.username,
      "password": this.state.password
    }
    // API Request
    axios.post(requesturl + 'api/v1/login', payload)
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.props.history.push("home");
        }
      })
      .catch(function (error) {
        alert("Invalid Credentials")
        console.log(error);
      });
  }

  render() {
    return (
      <div className="login-page">
        <AppBar
          title="Login"
        />
        <div className="login login-div">
          <TextField
            floatingLabelText="Username"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />

          <TextField
            type="password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />

          <RaisedButton className="submit-btn" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />

          <div className="login-register">
            <button onClick={this.register}> Register Here </button>
            </div>
          </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};