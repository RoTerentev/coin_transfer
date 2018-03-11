import React, { Fragment } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Repeat from 'material-ui/svg-icons/av/repeat';
import { CardTitle } from 'material-ui/Card';
import { cyan700 } from 'material-ui/styles/colors';


const ACTION_COL_STYLE = {
  width: 24,
  backgroundColor: '#01bcd4',
  color: '#000',
  cursor: 'pointer'
}
const ACTION_COL_HEAD_STYLE = {
  width: ACTION_COL_STYLE.width
}
const ROW_HEAD_STYLE = {
  fontWeight: 'bold'
}

export default ({
  transactionList,
  userId,
  sendByTransaction,
  filter
}) => {
  return (
    <Fragment>
      <CardTitle
        title="History"
        titleColor={cyan700}
      />
      <div className="ova">
        <Table
          style={{ minWidth: '100%', width: 'auto' }}
          bodyStyle={{ overflowX: 'auto' }}
          selectable={false}
        >
          <TableBody
            displayRowCheckbox={false}
          >
            {filter}
            {transactionList.length > 0 ?
              transactionList.map(transaction =>
                <TableRow key={transaction.id}>
                  {
                    transaction.rcpntId === userId ?
                      <TableRowColumn />
                      :
                      <TableRowColumn
                        style={ACTION_COL_STYLE}
                        key={transaction}
                        onTouchTap={sendByTransaction}
                        transaction={JSON.stringify(transaction)}
                      >
                        <Repeat />
                      </TableRowColumn>
                  }
                  <TableRowColumn>{transaction.date}</TableRowColumn>
                  {
                    transaction.rcpntId === userId ?
                      <Fragment>
                        <TableRowColumn>{transaction.senderName}</TableRowColumn>
                        <TableRowColumn className="amount-plus" >
                          +{transaction.amnt}
                        </TableRowColumn>
                      </Fragment>
                      :
                      <Fragment>
                        <TableRowColumn>{transaction.rcpntName}</TableRowColumn>
                        <TableRowColumn className="amount-minus" >
                          -{transaction.amnt}
                        </TableRowColumn>
                      </Fragment>
                  }
                  <TableRowColumn>{transaction.balance}</TableRowColumn>
                </TableRow>
              )
              :
              <TableRow>
                <TableRowColumn></TableRowColumn>
                <TableRowColumn>no data</TableRowColumn>
                <TableRowColumn>no data</TableRowColumn>
                <TableRowColumn>no data</TableRowColumn>
                <TableRowColumn>no data</TableRowColumn>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </Fragment>
  )
}
