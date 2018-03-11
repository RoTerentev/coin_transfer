import React, { Component } from 'react';
import { connect } from 'react-redux';

import TransactionHistory from '../TransactionHistory';
import TransactionHistoryFilter from './TransactionHistoryFilter';
import { coinFormChangeByTransaction } from '../../app-state/store';

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayList: props.transactionList || [],
      sortKey: 'date',
      sortDirection: 'ASC',
      params: {
        date: '',
        name: '',
        amount: '',
        balance: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transactionList !== nextProps.transactionList) {
      this.setState({
        displayList: nextProps.transactionList
      },
        () => {
          this.filtrate(this.state.params);
          this.sort(this.state.sortKey, this.state.sortDirection);
        })
    }
  }

  // TODO: very linked
  sendCoinByHistory = (e) => {
    let target = e.target;
    if (target.tagName === 'svg') {
      target = target.parentNode;
    }
    else if (target.tagName === 'path') {
      target = target.parentNode.parentNode;
    }

    const templateTransaction = JSON.parse(target.attributes.getNamedItem('transaction').value);
    window.scrollTo(0, 0);
    this.props.sendByHistory(templateTransaction);
  }

  filtrate = params => {
    const {
      date,
      name,
      amount,
      balance
    } = params;

    const userId = this.props.user.id;

    // TODO: not optimal
    this.setState({
      params,
      displayList: this.props.transactionList.filter(transaction => {
        let nameField = transaction.rcpntId !== userId ? 'rcpntName' : 'senderName';
        return (
          new RegExp(amount, 'i').test(transaction.amnt)
          && new RegExp(balance, 'i').test(transaction.balance)
          && new RegExp(date, 'i').test(transaction.date)
          && new RegExp(name, 'i').test(transaction[nameField])
        )
      })
    })

  }

  sort = (sortKey, sortDirection) => {
    let sortedArray = this.state.displayList.sort((transaction1, transaction2) => {
      switch (sortKey) {
        case 'date':
          const date1 = new Date(transaction1.date);
          const date2 = new Date(transaction2.date);
          if (date1 < date2) return -1;
          if (date1 > date2) return 1;
          return 0;

        case 'name':
          const sortField1 = transaction1.rcpntId !== this.props.user.id ? transaction1.rcpntName : transaction1.senderName;
          const sortField2 = transaction2.rcpntId !== this.props.user.id ? transaction2.rcpntName : transaction2.senderName;
          if (sortField1 < sortField2) return -1;
          if (sortField1 > sortField2) return 1;
          return 0;

        case 'amnt':
          const sortAmnt1 = transaction1.rcpntId !== this.props.user.id ? -transaction1.amnt : transaction1.amnt;
          const sortAmnt2 = transaction2.rcpntId !== this.props.user.id ? -transaction2.amnt : transaction2.amnt;
          return sortAmnt1 - sortAmnt2;

        case 'balance':
          return transaction1.balance - transaction2.balance;
      }
      return 0;
    });

    this.setState({
      sortKey,
      sortDirection,
      displayList: sortDirection === 'ASC' ? sortedArray : sortedArray.reverse()
    })
  }

  render() {
    const { user } = this.props;
    const { displayList, sortKey, sortDirection } = this.state;

    const historyFilter = (
      <TransactionHistoryFilter
        filtrate={this.filtrate}
        sort={this.sort}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
    );

    return (
      <TransactionHistory
        sendByTransaction={this.sendCoinByHistory}
        transactionList={displayList}
        userId={user.id}
        filter={historyFilter}
      />
    )
  }
}

const mapStateToProps = ({ user, transactionList }) => ({
  user,
  transactionList: transactionList.filter(transaction => {
    return transaction.senderId === user.id || transaction.rcpntId === user.id;
  })
});
const mapDispatchToProps = dispatch => ({
  sendByHistory: transaction => dispatch(coinFormChangeByTransaction(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
