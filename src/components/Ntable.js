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

const view = <View />;
const notify = <Notify />;
const clear = <Delete />;

var fetchAction =  require('node-fetch');

var url = "https://data.beneficence95.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};
//Todo: Limit to Include recent 6 results sent to the user logged in by matching "where"
var body = {
    "type": "select",
    "args": {
        "table": "article",
        "columns": [
            "id",
            {
                "name": "author",
                "columns": [
                    "name"
                ]
            },
            "title"
          ],
          "limit": "5",
    }
};

requestOptions.body = JSON.stringify(body);



export default class Ntable extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
          authors: [],
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
  fetchAction(url, requestOptions)
  .then(response => {
  	return response.json();
  })
  .then((adata) => {
      this.setState({authors: adata})
    });
  }

  render()
  {
      let adata = this.state.authors;
      let data = adata.map((val) => {return (
          [ val.id,val.author.name,val.title]
                )});

let row = (x,i) =>
               <TableRow key={i} selected={this.isSelected(i)}>
                   {x.map((y,k)=>
                       <TableRowColumn key={k}>
                         {y}
                       </TableRowColumn>)}
               </TableRow>;

      return (
        <div>
        <Table onRowSelection={this.handleRowSelection}  multiSelectable={true} height='254px'>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Date-Time</TableHeaderColumn>
              <TableHeaderColumn>USERS / GROUPS</TableHeaderColumn>
              <TableHeaderColumn>MESSAGE </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((x,i)=>row(x,i))}
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
