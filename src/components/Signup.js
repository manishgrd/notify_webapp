
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'

const style = {
  height: 830,
  width: 500,
  margin: 10,
  display: 'inline-block',
};

var fetchAction =  require('node-fetch');

var url = "https://api.dankness95.hasura-app.io/register";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

    export default class Signup extends Component {
      state = {
        fname:'',
        lname:'',
        uname:'',
        pwd:'',
        email:'',
        phone:'',
        device:'',
      }

   change = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };

   onSubmit=(e) =>{
     e.preventDefault();
     this.setState({
       fname:'',
       lname:'',
       uname:'',
       pwd:'',
       email:'',
       phone:'',
       device:'',
     });
     this.signup();
   }
  signup = () => {
  var body = {
  "F_Name": this.state.fname,
  "L_Name": this.state.lname,
  "User_Name": this.state.uname,
  "Pass": this.state.pwd,
  "Email_id": this.state.email,
  "Phone_No": this.state.phone,
  "Device_Id": this.state.device,
  };

  requestOptions.body = JSON.stringify(body);

  fetchAction(url, requestOptions)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
console.log('SUCCESSFUL :' + result);
  })
  .catch(function(error) {
    console.log('Request Failed:' + error);
  });

}


      render() {
        return(
          <div>

          <Paper style={style} zDepth={3} >
          <img src="images/logo.png" alt="logo" height="190" width="500"/>
          <Card>
          <LinearProgress mode="indeterminate" />
          <CardTitle
             title="To Signup (Register) " subtitle="Enter your Information " />
          <form>
          <TextField
              name="fname"
              hintText="First Name"
              floatingLabelText="Your First Name"
              value={this.state.fname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="lname"
                 hintText="Last Name"
                 floatingLabelText="Your Last Name"
                 value={this.state.lname}
                 onChange={e =>this.change(e)}
          /><br/>
          <TextField
              name="uname"
              hintText="Username"
              floatingLabelText="Your Username"
              value={this.state.uname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="pwd" type="password"
                 hintText="Password"
                 floatingLabelText="Your Password"
                 value={this.state.pwd}
                 onChange={e =>this.change(e)}
          /><br/>
          <TextField
              name="email"
              hintText="Email ID"
              floatingLabelText="Your Email ID"
              value={this.state.email}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="phone"
                 hintText="Phone no."
                 floatingLabelText="Your Phone no."
                 value={this.state.phone}
                 onChange={e =>this.change(e)}
          /><br/>
          <TextField
              name="device"
              hintText="Device ID"
              floatingLabelText="Name Your Device"
              value={this.state.device}
              onChange={e =>this.change(e)}
          /> <br/>
          <br/>
          <RaisedButton onClick={(e)=>this.onSubmit(e)} label="SIGNUP" secondary="true" />
          <FlatButton label=" " />
          <Link to='/'><RaisedButton label="Login" primary="true" /></Link>
          </form>
          <br/>
            <LinearProgress mode="indeterminate" />
          </Card>
          </Paper>
          </div>
        );
      }

  }
