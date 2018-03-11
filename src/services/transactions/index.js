import transactionList from '../../_fake_data/transactions.json';

export function getTransactionList() {
  // some ajax call to API

  return transactionList;
}

export function addTransactionToList(transaction) {
  // some ajax call to API

  return Object.assign({}, transaction, { id: Math.random() * 100 });
}