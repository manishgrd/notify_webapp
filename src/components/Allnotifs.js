import React, { Component }  from 'react';
import Topnavbar from './Topnavbar';
import Ntable from './Ntable';
import Paper from 'material-ui/Paper';


const style = {
  height: 750,
  width:1000,
  margin: 3,
  textAlign: 'center',
  display: 'inline-block',
};


export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      table:{
      limit:  "999",
      height:'550px',
      },
    };
  }

checkLoggedIn=()=> {
  let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    if(authToken===null){
      window.location.href = '/';
      alert ("Not logged in !! Please login first");}

}

  render(){
    this.checkLoggedIn();
  return(
    <div>
      <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar/>
    <Ntable data={this.state.table}/>
       </Paper>
    </div>
);
}
}
