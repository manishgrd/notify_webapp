import React, { Component }  from 'react';
import Paper from 'material-ui/Paper';
import Topnavbar from './Topnavbar';
import NotifDisplay from './NotifDisplay';

const style = {
  height: 950,
  width: 900,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

export default class Profile extends Component {


    constructor(props){
      super(props);
      this.state = {
        limit:  "5",
        height:'254px'
      };
    }


render(){

return(
  <div>
    <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar /><br/>
    <NotifDisplay /><br/>
    </Paper>
  </div>
     );
   }
}
