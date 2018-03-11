import React, { Component } from 'react';
import { connect } from 'react-redux';
import WalletBalance from '../components/WalletBalance';

function Balance(props) {
  return (
    <WalletBalance amount={props.amount} />
  );
}

const mapStateToProps = (state) => {
  return {
    amount: state.user.balance
  }
}

export default connect(mapStateToProps)(Balance);