import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


var fetchAction =  require('node-fetch');

var url = "https://data.beneficence95.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};
//Todo : include file id/link in request sent to server to display each users profile image
var body = {
    "type": "select",
    "args": {
        "table": "profile",
        "columns": [
            "Full_name"
        ]
    }
};

requestOptions.body = JSON.stringify(body);

let names= [];

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  componentDidMount() {
   fetchAction(url, requestOptions)
   .then(function(response) {
   	return response.json();
   })
   .then((adata) => {
        names = adata.map((arr, index, adata) => {return arr.Full_name});
                    })
   }

   listItems(values) {
     return names.map((name) => (
       <ListItem
         key={name}
         onClick={this.handleClose}
         primaryText={name}
         leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
         rightIcon={<CommunicationChatBubble />}
       />

     ));
   }


  render() {
    return (
      <div>

        <RaisedButton
          label="View Online"
          onClick={this.handleToggle}
        />
        <Drawer width={250}
        openSecondary={true}
        open={this.state.open}
        docked={false}
        onRequestChange={(open) => this.setState({open})}>
          <AppBar title="Online Peers" />

          <List>
             {this.listItems(names)}

            </List>

         <MenuItem onClick={this.handleClose}>Close</MenuItem>

        </Drawer>
      </div>
    );
  }
}
