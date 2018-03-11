import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Authentication from './screens/Authentication';
import Registration from './screens/Authentication/Registration';
import Dashboard from './screens/Dashboard';
import { ROUTES } from './constants/routes';

function Root({ route, user }) {
  if (user.id !== undefined) {
    return <Dashboard />;
  }
  switch (route) {
    case ROUTES.REGISTRATION:
      return <Registration />;
    default:
      return <Authentication />;
  }
}

const mapStateToProps = function ({ route, user }) {
  return {
    route,
    user
  }
};

export default connect(mapStateToProps)(Root);