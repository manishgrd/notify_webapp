import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import * as firebase from 'firebase';

const style = {
 textAlign: 'left',
};

var fetchAction =  require('node-fetch');
var url = "https://auth.beneficence95.hasura-app.io/v1/user/info";
var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
var requestOptions = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};

var body = {};

export default class NotifDisplay extends React.Component {
  constructor(props)
  {
  super(props);
  this.state={
  ndata:"* Notification status appears here *",
  notif:"",
  peer:"",
  snack: false,
  ntime:"",
  };
  }
/*
sendTokentoServer()
  {
    firebase.messaging().getToken()   //get user token
    .then((tokens) => {
    fetchAction(url, requestOptions)    //get user info
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      url = "https://data.beneficence95.hasura-app.io/v1/query";
      requestOptions = {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + authToken,
          }
      };
   body = {
    "type": "update",
    "args": {
        "table": "Token_map",
        "where": { "$and": [
              {"username": {  "$eq": result.username }  },
              {"Hasura_id": {  "$eq": result.hasura_id } }
            ]   },
        "$set": {
            "fcm_tkn": tokens,
            "device": window.navigator.appVersion,
        }
    }
};;
      requestOptions.body = JSON.stringify(body);

      fetchAction(url, requestOptions)                      //post user token to server
      .then(function(response) {
      	return response.json();
      })
      .then(function(result) {
      	console.log(result);
      })
      .catch(function(error) {
      	console.log('Token Updation:' + error);
      });

    })
    .catch((error) => {
      console.log('User info retrieval:' + error);
    });


    })
    .catch((error) => {
      console.log('Firebase Messaging:' + error);
    });
  }

*/

  componentDidMount()
  {  const msg = firebase.messaging();
  msg.requestPermission()
     .then(()=> {
       console.log("PERMITTED");
       this.setState({ndata: "Push Notifications ENABLED !!"});
  //     this.sendTokentoServer();
       })
       .catch((err)=> {
         this.setState({ndata: err.message});
      });

  msg.onMessage(payload => {
      this.getNotifTime();
      console.log('onMessage:',payload);
      this.setState({ notif: payload.notification.body, peer: payload.notification.title, snack: true });
    });

  }

  addZero = (i) => {
      if (i < 10) {  i = "0" + i; }
      return i;  }

getNotifTime = () => {
      var d = new Date();
      var h = this.addZero(d.getUTCHours());
      var m = this.addZero(d.getUTCMinutes());
      var s = this.addZero(d.getUTCSeconds());
      var x =  "@ UTC " +h + ":" + m + ":" + s;
      this.setState({ntime: x});
  }
// Todo : include date-time stamp from server for each received message or use js to indicate local time
//Todo : include file id/link in request sent to server to display each users profile image

render() {

  return(
  <div>
  <Paper style={style} zDepth={3} >
  <Card>
    <CardHeader
      title={this.state.peer}
      subtitle={this.state.ntime}
      avatar="/images/notify.png"
    />
    <CardTitle title={this.state.notif} subtitle={this.state.ndata}/>
  </Card>
  </Paper>
  <Snackbar
         open={this.state.snack}
         message="New Notification for you !!"
         autoHideDuration={5000}
       />
  </div>
);

}

}
