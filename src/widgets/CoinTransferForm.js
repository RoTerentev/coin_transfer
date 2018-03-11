import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import { CardTitle, Card, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { cyan700 } from 'material-ui/styles/colors';

import {
  balanceAdd,
  addTransaction,
  coinFormChangeRecipientId,
  coinFormChangeSearchText,
  coinFormChangeAmount,
  coinFormChangeExpanded,
  coinFormClean
} from '../app-state/store';
import { addTransactionToList } from '../services/transactions';

// for autocomplete
const userSourceConfig = {
  text: 'name',
  value: 'id'
};

function formatDataToString(d) {
  const MM = (d.getMonth() + 1).toString();
  const HH = (d.getHours()).toString();
  const mm = (d.getMinutes()).toString();
  const month = MM.length == 1 ? '0' + MM : MM;
  const hours = HH.length == 1 ? '0' + HH : HH;
  const minutes = mm.length == 1 ? '0' + mm : mm;
  return `${d.getFullYear()}.${month}.${d.getDate()} ${hours}:${minutes}`;
}

// TODO: need servers msg preview after send coins (succes or error)
class CoinTransferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validRecipientId: true,
      validAmount: true
    }
  }

  // userSearch - user's object OR user's name string
  findUser = (userSearch) => {
    const {
      user,
      userList,
      changeRecipientId,
      changeSearchText
    } = this.props;

    // when userSearch is object
    if (userSearch.id !== undefined) {
      changeRecipientId(userSearch.id);
      changeSearchText(userSearch.name);
      this.setState({
        validRecipientId: true
      });
      return;
    }

    // when userSearch is string
    const foundUser = userList.find(item => {
      return item.id !== user.id && (new RegExp(userSearch, 'i')).test(item.name);
    });
    if (foundUser !== undefined) {
      changeRecipientId(foundUser.id);
      changeSearchText(foundUser.name);
      this.setState({
        validRecipientId: true
      })
    }
    else {
      changeRecipientId(0);
      changeSearchText('');
      this.setState({
        validRecipientId: false
      })
    }
  }

  changeAmount = (_, amount) => {
    const { balance } = this.props.user;
    this.props.changeAmountVal(amount);

    this.setState({
      validAmount: amount > 0 && amount <= balance
    })
  }

  onUpdateRecipient = (searchText) => {
    this.setState({
      recipientSearchText: searchText
    })
  }

  commit = () => {
    const { balance, id, name } = this.props.user;
    const { searchText, amount, recipientId } = this.props.coinTransferForm;
    const { sendCoins, createTransaction } = this.props;

    if (recipientId !== 0 && amount > 0 && amount <= balance) {
      sendCoins(amount); // TODO: add servers result msg in UI

      // TODO: transaction must be created on server
      const resultTransaction = addTransactionToList(
        {
          type: 1,
          date: formatDataToString(new Date()),
          rcpntId: recipientId,
          rcpntName: searchText,
          senderId: id,
          senderName: name,
          amnt: amount,
          balance: balance - amount
        }
      );

      createTransaction(resultTransaction);
      this._clearForm();
      return;
    }

    if (recipientId === 0) {
      this.setState({
        validRecipientId: false
      });
      return;
    }

    this.setState({
      validAmount: false
    });

  }

  _clearForm = () => {
    this.setState({
      validRecipientId: true,
      validAmount: true,
    })
    this.props.cleanForm();
  }

  render() {
    const { user, userList } = this.props;
    // exclude login user
    const users = userList.filter(userItem => {
      return user.id !== userItem.id
    });

    const {
      validRecipientId,
      validAmount
    } = this.state;

    const {
      changeExpanded,
      changeSearchText,
      coinTransferForm
    } = this.props;

    const isValid = validRecipientId && validAmount;

    return (
      <Card
        style={{
          margin: '10px auto'
        }}
        expandable
        expanded={coinTransferForm.expanded}
        onExpandChange={changeExpanded}
      >
        <CardTitle
          title="Send coins"
          subtitle="coins from your balance will be transfered to selected user"
          titleColor={cyan700}
          actAsExpander
        />
        <CardText
          expandable
          className="df f-dir-col"
        >
          <AutoComplete
            floatingLabelText="Name of correspondent"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={users || []}
            dataSourceConfig={userSourceConfig}
            fullWidth
            errorText={validRecipientId ? '' : 'user not founded'}
            onNewRequest={this.findUser}
            searchText={coinTransferForm.searchText}
            onUpdateInput={changeSearchText}
          />
          <TextField
            hintText="input amount"
            floatingLabelText="Amount of coins"
            fullWidth
            errorText={validAmount ? '' : 'amount is integer which more then zero and limited by your balance'}
            onChange={this.changeAmount}
            value={coinTransferForm.amount}
          />
        </CardText>
        <CardActions
          expandable
          className="df"
        >
          <RaisedButton
            label="commit"
            primary
            disabled={!isValid}
            onTouchTap={this.commit}
          />
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = ({ user, userList, coinTransferForm }) => ({
  user,
  userList,
  coinTransferForm
});
const mapDispatchToProps = dispatch => ({
  sendCoins: amount => dispatch(balanceAdd(-amount)),
  createTransaction: transaction => dispatch(addTransaction(transaction)),
  changeRecipientId: data => dispatch(coinFormChangeRecipientId(data)),
  changeSearchText: data => dispatch(coinFormChangeSearchText(data)),
  changeAmountVal: data => dispatch(coinFormChangeAmount(data)),
  changeExpanded: data => dispatch(coinFormChangeExpanded(data)),
  cleanForm: () => dispatch(coinFormClean())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinTransferForm);