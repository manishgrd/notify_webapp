import React, { Component }  from 'react';
import Topnavbar from './Topnavbar';
import Ntable from './Ntable';

export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      table:{
      limit:  "5",
      height:'254px',
      },
    };
  }


  render(){
  return(
    <div>
    <Topnavbar/>
    <Ntable data={this.state.table}/>
    </div>
);
}
}
