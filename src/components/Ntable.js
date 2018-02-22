import React , {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import View from 'material-ui/svg-icons/action/view-list';
import Notify from 'material-ui/svg-icons/social/notifications';
import {Tabs, Tab} from 'material-ui/Tabs';
import Received from 'material-ui/svg-icons/navigation/arrow-back';
import Sent from 'material-ui/svg-icons/navigation/arrow-forward';

const view = <View />;
const notify = <Notify />;
const clear = <Delete />;

let url = "https://data.dankness95.hasura-app.io/v1/query";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};
let urlX = "https://auth.dankness95.hasura-app.io/v1/user/info";
let requestOptionsX = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};

let body = {};let selectMsg = [["aa","bb","cc"],["aa","bb","cc"],["aa","bb","cc"]];

export default class Ntable extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
          MessagesSent: [],
          MessagesReceived:[],
          selected: [2],
          selectedIndex: 0,
      };

  }

select = (index) => this.setState({selectedIndex: index});

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  componentDidMount() {
      fetch(urlX, requestOptionsX)    //get user info
      .then((response) => {
        return response.json();
      })
      .then((result) => {
      console.log(result);
      this.getSentMessages(result.username);
      this.getReceivedMessages(result.username);
      })
      .catch((error) => {
        console.log('User info retrieval:' + error);
      });

  }

getSentMessages=(user)=>{
  console.log(user);
  body = {
  "type": "select",
  "args": {
      "table": "Messages",
      "columns": [
          "Message",
          "To",
          "time"
      ],
      "where": {
          "From": {
              "$eq": user,
          }
      },
      "limit": this.props.data.limit,
      "order_by": [
          {
              "column": "time",
              "order": "desc"
          }
      ]
  }
};
requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then((response) => {
  return response.json();
})
.then((adata) => {
    this.setState({MessagesSent: adata})
  });
}

getReceivedMessages=(user)=>{
  console.log(user);
  body = {
  "type": "select",
  "args": {
      "table": "Messages",
      "columns": [
          "Message",
          "From",
          "time"
      ],
      "where": {
          "To": {
              "$eq": user,
          }
      },
      "limit": this.props.data.limit,
      "order_by": [
          {
              "column": "time",
              "order": "desc"
          }
      ]
  }
};
requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then((response) => {
  return response.json();
})
.then((adata) => {
    this.setState({MessagesReceived: adata})
  });
}

showSent=()=>{
 selectMsg=this.state.MessagesReceived.map((val) => {return ([ val.time,val.From,val.Message])});
  console.log("RECEIVED",selectMsg); }

showReceived=()=>{
   selectMsg=this.state.MessagesSent.map((val) => {return ([ val.time,val.To,val.Message])})
  console.log("SENT",selectMsg);}

  render()
  {


let row = (x,i) =>
               <TableRow key={i} selected={this.isSelected(i)}>
                   {x.map((y,k)=>
                       <TableRowColumn key={k}>
                         {y}
                       </TableRowColumn>)}
               </TableRow>;

      return (
        <div>
        <Tabs>
          <Tab
            icon={<Received />}
            label="Received"
            onActive={this.showReceived()}
          />
          <Tab
            icon={<Sent />}
            label="Sent"
            onActive={this.showSent()}
          />

        </Tabs>
        <Table onRowSelection={this.handleRowSelection}  multiSelectable={true} height={this.props.data.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Date-Time</TableHeaderColumn>
              <TableHeaderColumn>USERS / GROUPS</TableHeaderColumn>
              <TableHeaderColumn>MESSAGE </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectMsg.map((x,i)=>row(x,i))}
          </TableBody>
        </Table>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="View"
              icon={view}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Clear"
              icon={clear}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Notify others"
              icon={notify}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        </div>
        )
}
}
