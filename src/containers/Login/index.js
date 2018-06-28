import React from 'react';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'
import {loginAction} from '../../actions/login'
import {IsValidForm} from '../../components/validation'
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: {
        email: '',
        password: ''
      },
      errors:{},
      errorMsg: ''
    }
  }
  onChange(key,event){
    const { login } = this.state
    login[key] = event.target.value
    this.setState({ login })
  }
  onSubmit(e){
      e.preventDefault();
      let fields = ['email', 'password']
       let formValidation = IsValidForm(fields, this.state.login)
       this.setState({ errors: formValidation.errors, errorMsg: '' })
       if (formValidation.validate) {
       this.props.dispatch(loginAction(this.state.login)).then(res=>{
         if (!res.token) {
          this.setState({errorMsg: res.message})
         }
         else{
           this.setState({errorMsg: ''})
           this.props.history.push('/dashboard')
         }
       })
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
          <div style={{width: '500px',margin: '0 auto',marginTop: '220px',border: '1px solid black',padding: '50px',backgroundColor: '#e8e6e6'}}>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="Email" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
              {!!this.showError('email') ? <p className="error-message">{this.getError('email')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="Password" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
              {!!this.showError('password') ? <p className="error-message">{this.getError('password')} </p> : null}
            </div>
            <button style={{width: 400,height: '50px'}} type="submit" className="pt-button .modifier">Login</button>
            {this.state.errorMsg != '' && <p className="error-message" style={{textAlign: 'center', marginTop: 20}}>{this.state.errorMsg}</p>}
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
)(Login)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
