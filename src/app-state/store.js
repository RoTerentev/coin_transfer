import { createStore, combineReducers } from 'redux';
import { ROUTES } from '../constants/routes';

import { getUser, setUser } from '../services/localStorage';
import { getUserList } from '../services/users';
import { getTransactionList } from '../services/transactions';

// constants
export const USER_SET = 'USER_SET';
export const USER_BALANCE_SET = 'USER_BALANCE_SET';
export const USER_BALANCE_ADD = 'USER_BALANCE_ADD';

export const USER_LIST_ADD = 'USER_LIST_ADD';

export const TRANSACTION_LIST_ADD = 'TRANSACTION_LIST_ADD';

export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export const COIN_FORM_CHANGE_RECIPIENT_ID = 'COIN_FORM_CHANGE_RECIPIENT_ID';
export const COIN_FORM_CHANGE_SEARCH_TEXT = 'COIN_FORM_CHANGE_SEARCH_TEXT';
export const COIN_FORM_CHANGE_AMOUNT = 'COIN_FORM_CHANGE_AMOUNT';
export const COIN_FORM_CHANGE_EXPANDED = 'COIN_FORM_CHANGE_EXPANDED';
export const COIN_FORM_CHANGE_BY_TRANSACTION = 'COIN_FORM_CHANGE_BY_TRANSACTION';
export const COIN_FORM_CLEAN = 'COIN_FORM_CLEAN';


// state init
const localUser = getUser() || {};

const initialState = {
  user: localUser,
  userList: getUserList() || [],
  transactionList: getTransactionList() || [],
  route: ROUTES.LOGIN,
  coinTransferForm: {
    recipientId: 0,
    searchText: '',
    amount: 0,
    expanded: false
  }
}

// action creators
export function userSet(user) {
  return {
    type: USER_SET,
    user
  }
}
export function balanceSet(amount) {
  return {
    type: USER_BALANCE_SET,
    amount
  }
}
export function balanceAdd(amount) {
  return {
    type: USER_BALANCE_ADD,
    amount
  }
}

export function changeRoute(routePath) {
  return {
    type: CHANGE_ROUTE,
    routePath
  }
}

export function addUser(user) {
  return {
    type: USER_LIST_ADD,
    user
  }
}

export function addTransaction(transaction) {
  return {
    type: TRANSACTION_LIST_ADD,
    transaction
  }
}


export function coinFormChangeRecipientId(value) {
  return {
    type: COIN_FORM_CHANGE_RECIPIENT_ID,
    value
  }
}
export function coinFormChangeSearchText(value) {
  return {
    type: COIN_FORM_CHANGE_SEARCH_TEXT,
    value
  }
}
export function coinFormChangeAmount(value) {
  return {
    type: COIN_FORM_CHANGE_AMOUNT,
    value
  }
}
export function coinFormChangeExpanded(value) {
  return {
    type: COIN_FORM_CHANGE_EXPANDED,
    value
  }
}
export function coinFormClean() {
  return {
    type: COIN_FORM_CLEAN
  }
}
export function coinFormChangeByTransaction(value) {
  return {
    type: COIN_FORM_CHANGE_BY_TRANSACTION,
    value
  }
}

// reducers
const userReducer = function (userInState = initialState.user, action) {
  switch (action.type) {
    case USER_SET:
      // TODO: this code must be in middleware
      setUser(action.user);
      return action.user;

    case USER_BALANCE_SET:
      return Object.assign({}, userInState, { balance: action.amount });

    case USER_BALANCE_ADD:
      return Object.assign({}, userInState, { balance: userInState.balance + action.amount });

    default:
      return userInState;
  }
}

const userListReducer = function (userList = initialState.userList, action) {
  switch (action.type) {
    case USER_LIST_ADD:
      return userList.concat([action.user]);
  }
  return userList;
}
const transactionListReducer = function (transactionList = initialState.transactionList, action) {
  switch (action.type) {
    case TRANSACTION_LIST_ADD:
      return transactionList.concat([action.transaction]);
  }
  return transactionList;
}

const routeReducer = function (route = initialState.route, { type, routePath }) {
  switch (type) {
    case CHANGE_ROUTE:
      if (route !== routePath) {
        return routePath;
      }
    default:
      return route;
  }
}

const coinFormReducer = function (coinForm = initialState.coinTransferForm, { type, value }) {
  switch (type) {
    case COIN_FORM_CHANGE_RECIPIENT_ID:
      return Object.assign({}, coinForm, { recipientId: value });
    case COIN_FORM_CHANGE_SEARCH_TEXT:
      return Object.assign({}, coinForm, { searchText: value });
    case COIN_FORM_CHANGE_AMOUNT:
      return Object.assign({}, coinForm, { amount: value });
    case COIN_FORM_CHANGE_EXPANDED:
      return Object.assign({}, coinForm, { expanded: value });
    case COIN_FORM_CHANGE_BY_TRANSACTION:
      return {
        recipientId: value.rcpntId,
        searchText: value.rcpntName,
        amount: value.amnt,
        expanded: true
      };
    case COIN_FORM_CLEAN:
      return initialState.coinTransferForm;
    default:
      return coinForm;
  }
}


const reducers = combineReducers({
  user: userReducer,
  userList: userListReducer,
  transactionList: transactionListReducer,
  route: routeReducer,
  coinTransferForm: coinFormReducer
});

export default createStore(reducers, initialState);