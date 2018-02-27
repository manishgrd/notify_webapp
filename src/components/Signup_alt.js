
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'

const style = {
  height: 780,
  width: 500,
  margin: 10,
  display: 'inline-block',
};


const url = "https://api.dankness95.hasura-app.io/register";

const requestOptions = {
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
      phone:''
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
       phone:''
     });
     this.signup();
   }


  signup = () => {
    let body = {
    "F_Name": this.state.fname,
    "L_Name": this.state.lname,
    "User_Name": this.state.uname,
    "Pass": this.state.pwd,
    "Email_id": this.state.email,
    "Phone_No": this.state.phone
    };

  requestOptions.body = body;
  console.log(requestOptions);
  fetch(url, requestOptions)
  .then((response) => {
    return response;
  })
  .then((result) => {
  	console.log(result);
    alert(result);
  //	let authToken = result.auth_token
  //	window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
  //  if (result=="Your Account has been created sucessfully !")                    //  if(result.auth_token!=null)
  //  {   window.location.href = '/';
  //    alert("AWESOME !! now login to continue");    }
  //  else
  //  alert("Something went wrong ! Try again !");
  })
  .catch(function(error) {
  	alert('Error:' + error);
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
             title="To Signup (Register) " subtitle="Enter your Info & click SIGNUP" />
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
              floatingLabelText="Create A Username"
              value={this.state.uname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="pwd" type="password"
                 hintText="Password"
                 floatingLabelText="A Password to Login"
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
          <br/>
          <RaisedButton onClick={(e)=>this.onSubmit(e)} label="SIGNUP" secondary={true} />
          <FlatButton label=" " disabled={true}/>
          <Link to='/'><RaisedButton label="Login" primary={true} /></Link>
          </form>
          <br/>
            <LinearProgress mode="indeterminate" />
          </Card>
          </Paper>
          </div>
        );
      }

  }
