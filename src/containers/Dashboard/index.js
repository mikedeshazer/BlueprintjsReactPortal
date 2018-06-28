import React from 'react'
import { connect } from 'react-redux'
import {editAction} from '../../actions/editprofile'
class Dashboard extends React.Component{
  onSubmit(){
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
  onEdit(){
    this.props.history.push('/editprofile')
  }
  render(){
    console.log(this.props,'ppppp')
    return(
      <div style={{textAlign: 'center',marginTop: 20}}>
        <h1 >Welcome to Dashboard</h1>
        <button style={{width: 400,height: '40px'}} type="button" className="pt-button .modifier" onClick={this.onSubmit.bind(this)}>Logout</button><br /><br />
        <button style={{width: 400,height: '40px'}} type="button" className="pt-button .modifier" onClick={this.onEdit.bind(this)}>Edit Profile</button>

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
)(Dashboard)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
