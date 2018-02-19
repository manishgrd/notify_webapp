import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as firebase from 'firebase';


var fetchAction =  require('node-fetch');

var url = "https://data.beneficence95.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "author",
        "columns": [
            "name",
        ]
    }
};

requestOptions.body = JSON.stringify(body);

  let names= [];
  var tokid="";

export default class ComposeNew extends React.Component {

    state = {
    open: false,
    values: [],
    message: "",
    mytoken: "",
  };

 componentDidMount() {
  fetchAction(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then((adata) => {
       names = adata.map((arr, index, adata) => {return arr.name});
                   })
  const msg = firebase.messaging();
   msg.getToken()   //get user token
   .then((tokens) => {
     this.setState({mytoken: tokens});
     tokid = tokens;
   })
   .catch((error) => {
     console.log('Firebase Messaging:' + error);
   });
  }

  sendnotif(){

    var key = "AIzaSyA1ub-EQV6yv_klcPQmzjGSYMYG-SGAsYY";
    console.log('tokid:' + tokid);
    var notification = {
      'title': this.state.values,
      'body': this.state.message,
      'icon': '/images/notify.png',
      'click_action': 'https://ui.beneficence95.hasura-app.io/home'
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'to': tokid,

      })
    }).then(function(response) {
      console.log("SUCCESSFUL",response);
    }).catch(function(error) {
      console.error("FAILED",error);
    })

    }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit=(e) =>{
    e.preventDefault();
    console.log(this.state);
    this.sendnotif();
    this.setState({
      message:"",
      open:false,
    });
    console.log(this.state.message);
}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, values) => this.setState({values});

  menuItems(values) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const actions = [
      <RaisedButton
        label="Push"
        secondary={true}
        onClick={(e)=>this.onSubmit(e)}
      />,
      <FlatButton label=" "/>,
      <RaisedButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    const {values} = this.state;

    return (
      <div>

        <RaisedButton label="COMPOSE NEW" secondary={true} onClick={this.handleOpen} />

        <Dialog
          title="Compose a new notification"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

        <SelectField
        multiple={false}
        hintText="Select users"
        value={values}
        maxHeight={300}
        onChange={this.handleChange} >
        {this.menuItems(values)}
        </SelectField>

      <TextField  name="message"  fullWidth={true}
                  floatingLabelText="Enter Notifcation message below"
                  multiLine={true}  rows={2}  rowsMax={4}
                  value={this.state.message}
                  onChange={e =>this.change(e)}
            />

        </Dialog>
      </div>
    );
  }
}
