import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import * as firebase from 'firebase';

const style = {
 textAlign: 'left',
};




class NotifDisplay extends React.Component {
  constructor()
  {
  super();
  this.state={
  ndata: "(^_^) Notifications supported !!",
  notif:"",
  peer:"",
  };
  }


  componentDidMount()
  {
    const msg = firebase.messaging();

    msg.requestPermission()
     .then(function() {
  console.log('*Notification permission granted*');
  return msg.getToken();
     })
    .then(function(tokens){
  console.log(tokens);
     })
     .catch(function(err) {
       console.log("ERROR: Notifications not supported on this browser !!");
    });

    msg.onMessage(payload => {
      console.log('onMessage:',payload);
      this.setState({ notif: payload.notification.body, peer: payload.notification.title });
    });

  }

render() {

  return(
  <div>
  <Paper style={style} zDepth={3} >
  <Card>
    <CardHeader
      title={this.state.peer}
      subtitle="Date --time"
      avatar="images/jsa-128.jpg"
    />
    <CardTitle title={this.state.notif} subtitle={this.state.ndata}/>
  </Card>
  </Paper>
  <Snackbar
         open={true}
         message="New Notification Received !!"
         autoHideDuration={5000}
       />
  </div>
);

}

}

export default NotifDisplay;
