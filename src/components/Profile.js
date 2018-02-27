
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import NotifDisplay from './NotifDisplay';
import Topnavbar from './Topnavbar';
import { Link } from 'react-router-dom'

const outstyle = {
  height: 950,
  width: 1000,
  margin: 2,
  display: 'inline-block',
};


const style = {
  height: 500,
  width: 990,
  margin: 5,
  display: "flex",
  flexDirection: "row",
  backgroundColor: "DodgerBlue"
};

const instyle = {
  height: 490,
  width: 490,
  margin: 5,};
const url = "https://filestore.dankness95.hasura-app.io/v1/file";
const usr = "https://api.dankness95.hasura-app.io/return_user_info";
const urq = "https://data.dankness95.hasura-app.io/v1/query";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let requestOptions = {};


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      file_id:"file_id",
      file_url: "",
    }
  }

componentWillMount(){
this.setFileUrl();
}

setFileUrl=()=>{
this.setState({file_url:url+'/'+this.state.file_id});
}

  onSubmit=(e) =>{
    e.preventDefault();
    this.upload();
  }

 upload = () => {
let img_file = this.fileInput.files[0];
console.log(  `Selected file - ${this.fileInput.files[0].name}`);
 requestOptions = {
     method: "POST",
     headers: {
         "Content-Type": "image/png",
        "Authorization": "Bearer " + authToken,
     },
     body : img_file
 };
 fetch(url, requestOptions)
 .then((response)=>{
   return response.json();
 })
 .then((result)=> {
   this.setState({file_id:result.file_id});
   this.setFileUrl();
 })
 .catch(function(error) {
   alert('Request Failed:' + error);
 });
 }

getUserInfo=()=>{
  requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

let body = {};
    body= {
        "User_Name": "vaibhavk98"
    }

requestOptions.body = JSON.stringify(body);
          fetch(usr, requestOptions)
          .then((response)=>{
            return response;
          })
          .then((result)=> {
            console.log("SERVER INFO RESPONSE:",result);
          })
          .catch(function(error) {
            alert('Request Failed:' + error);
          });
}

  render() {
    return (
      <div>
      <Paper style={outstyle} zDepth={5} rounded={true} >
      <Topnavbar /><br/>
      <NotifDisplay /><br/>
      <Paper style={style} zDepth={3} >

		 <Paper style={instyle} zDepth={3} >
      <form >
        <br/>
        <h4> Edit Your Profile </h4>
        <br/><br/>
        <img src={this.state.file_url} alt="Profile Image" height="120" width="120" />
        <h5> <u>USER NAME</u> </h5>
		<br/>
        <label>

        <strong> <u>Select image file to upload</u> </strong>
          <br/><br/>
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}
          />
        </label>
        <br/><br/>
        <RaisedButton onClick={(e)=>this.onSubmit(e)} label="UPLOAD" secondary={true} />

      </form>

      <h4> {this.state.file_url} </h4>
      </Paper>
	  <Paper style={instyle} zDepth={3} >
    <form>

    <TextField
        name="fname"
        hintText="First Name"
        floatingLabelText="Your First Name"

    /> <br/>
    <TextField name="lname"
           hintText="Last Name"
           floatingLabelText="Your Last Name"

    /><br/>
    <TextField
        name="email"
        hintText="Email ID"
        floatingLabelText="Your Email ID"

    /> <br/>
    <TextField name="phone"
           hintText="Phone no."
           floatingLabelText="Your Phone no."

    /><br/>
    <br/>
    <RaisedButton onClick={(e)=>this.onSubmit(e)} label="SAVE" secondary={true} />
    <FlatButton label=" " disabled={true}/>
    <RaisedButton label="Discard" onClick={this.getUserInfo} primary={true} />
    </form>
    <br/><br/>
    <Link to='/home'><RaisedButton label="Go Back to home" primary={true} /></Link>
	  </Paper>
      </Paper>
        </Paper>
      </div>
    );
  }
}
