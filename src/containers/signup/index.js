
import React from 'react';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'
import {signupAction} from '../../actions/signup'
import {IsValidForm} from '../../components/validation'
class Signup extends React.Component{
  constructor(){
    super();
    this.state = {
      signup: {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors:{},
      errorMsg: '',
      serverMsg: ''
    }
  }
  onChange(key,event){
    const { signup } = this.state
    signup[key] = event.target.value
    this.setState({ signup })
  }
  validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  onSubmit(e){
    e.preventDefault();
    let {signup} = this.state;
    let fields = ['username', 'email', 'password', 'confirm_password']
     let formValidation = IsValidForm(fields, signup)
     this.setState({ errors: formValidation.errors, errorMsg: '', serverMsg: '' })
     if (formValidation.validate) {
      let emailValidate = this.validateEmail(signup.email)
      let {errors} = this.state;
        if (signup.password != signup.confirm_password) {
          errors['confirm_password'] = "password doesn't match";
          this.setState({ errors })
        }
        else if(!emailValidate){
          errors['email'] = "Please enter valid email";
          this.setState({ errors })
        }
        else{
           this.props.dispatch(signupAction(this.state.signup)).then(res=>{
             if (res.status == 200) {
                signup = {username: '', email: '', password: '', confirm_password: ''}
                this.setState({signup, serverMsg: ''});
                this.props.history.push('/')
             }
             else{
              this.setState({serverMsg: res.message})
             }
           })
        }
     }

  }
  showError(key) {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return true
     }
     return false
   }
   getError(key) {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return typeof errors[key] === 'object' ? errors[key].join(',') : errors[key]
     }
     return false
   }
  render(){
    return(
      <div>
        <div>
          <Navbar />
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div style={{width: '500px',margin: '0 auto',marginTop: '200px',border: '1px solid black',padding: '50px',backgroundColor: '#e8e6e6'}}>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="Username" type="text" dir="auto" onChange={this.onChange.bind(this,'username')}/>
              {!!this.showError('username') ? <p className="error-message">{this.getError('username')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="Email" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
              {!!this.showError('email') ? <p className="error-message">{this.getError('email')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="Password" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
              {!!this.showError('password') ? <p className="error-message">{this.getError('password')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="Confirm Password" type="password" dir="auto" onChange={this.onChange.bind(this,'confirm_password')}/>
              {!!this.showError('confirm_password') ? <p className="error-message">{this.getError('confirm_password')} </p> : null}
            </div>
            <button style={{width: 400,height: '50px'}} type="submit" className="pt-button .modifier">Signup</button>
            {this.state.serverMsg != '' && <p className="error-message" style={{textAlign: 'center', marginTop: 20}}>{this.state.serverMsg}</p>}
          </div>
        </form>
      </div>

    )
  }
}
export default connect(
state => (
  {

  },
  mapDispatch
)
)(Signup)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
