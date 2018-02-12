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
        "table": "Token_map",
        "columns": [
            "username",
            "fcm_tkn"
        ]
    }
};

requestOptions.body = JSON.stringify(body);

  let names= [];
  let tokid=[];

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
       names = adata.map((arr, index, adata) => {return arr.username});
       tokid = adata.map((arr, index, adata) => {return arr.fcm_tkn});
                   })


  }

  sendnotif(){

    var key = "AIzaSyClPBf8lbhy-gZ6kGKiXr5ZhTjtHhH8Ero";
    console.log("toID :",tokid[1]);

    var notification = {
      'title': this.state.values,
      'body': this.state.message,
      'icon': '/images/notify.png',
      'click_action': 'http://localhost:3002/home'
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'to': tokid[1]

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
        label="Reset"
      />,
      <RaisedButton
        label="Push"
        secondary={true}
        onClick={(e)=>this.onSubmit(e)}
      />,
      <FlatButton
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
