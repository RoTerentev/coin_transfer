import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Exit from 'material-ui/svg-icons/action/exit-to-app';

import UserInfo from '../../components/UserInfo';
import History from '../../components/containers/History';
import CoinTransferForm from '../../widgets/CoinTransferForm';
import Balance from '../../widgets/Balance';

import { ROUTES } from '../../constants/routes';
import { changeRoute, userSet } from '../../app-state/store';
import { logout } from '../../services/auth';

class Dashboard extends Component {
  exit = () => {
    this.props.userLogout();
    this.props.routeToAuth();
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <Paper className="df fxww jcsb" style={{ backgroundColor: 'rgba(1,188,212,0.3)' }}>
          <UserInfo
            name={user.name || 'User Name'}
            email={user.email || 'user@email.com'}
          />
          <div className="df m0">
            <Balance />
            <IconButton onTouchTap={this.exit}>
              <Exit />
            </IconButton>
          </div>
        </Paper>
        <section className="df f-dir-col ovh">
          <CoinTransferForm />
          <Divider />
          <History />
        </section>
      </Fragment >
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
});
const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userSet({})),
  routeToAuth: () => dispatch(changeRoute(ROUTES.LOGIN))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
