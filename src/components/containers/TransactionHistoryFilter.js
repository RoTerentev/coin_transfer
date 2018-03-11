import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import TableSearchSortCell from '../TableSearchSortCell';

const ACTION_COL_HEAD_STYLE = {
  width: 24
}
const ROW_HEAD_STYLE = {
  fontWeight: 'bold'
}

export default class TransactionHistoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      name: '',
      amount: '',
      balance: ''
    }
  }

  changeDate = (_, date) => {
    this.setState({
      date
    },
      this._filtrate)
  }
  changeName = (_, name) => {
    this.setState({
      name
    },
      this._filtrate)
  }
  changeAmount = (_, amount) => {
    this.setState({
      amount
    },
      this._filtrate)
  }
  changeBalance = (_, balance) => {
    this.setState({
      balance
    },
      this._filtrate)
  }

  _filtrate = () => {
    let filterParams = this.state;
    this.props.filtrate(filterParams);
    return;
  }

  render() {
    const { sort, sortKey, sortDirection } = this.props;
    return (
      <TableRow key={0} style={ROW_HEAD_STYLE}>
        <TableRowColumn style={ACTION_COL_HEAD_STYLE} />
        <TableRowColumn>
          <TableSearchSortCell
            dataKey="date"
            filtrate={this.changeDate}
            sort={sort}
            label="Date"
            selected={sortKey === "date"}
            direction={sortDirection}
          />
        </TableRowColumn>
        <TableRowColumn>
          <TableSearchSortCell
            dataKey="name"
            filtrate={this.changeName}
            sort={sort}
            label="Correspondent"
            selected={sortKey === "name"}
            direction={sortDirection}
          />
        </TableRowColumn>
        <TableRowColumn>
          <TableSearchSortCell
            dataKey="amnt"
            filtrate={this.changeAmount}
            sort={sort}
            label="Amount"
            selected={sortKey === "amnt"}
            direction={sortDirection}
          />
        </TableRowColumn>
        <TableRowColumn>
          <TableSearchSortCell
            dataKey="balance"
            filtrate={this.changeBalance}
            sort={sort}
            label="Balance"
            selected={sortKey === "balance"}
            direction={sortDirection}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}
