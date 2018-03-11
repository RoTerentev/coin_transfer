import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AuthForm from '../../components/AuthForm'

import { ROUTES } from '../../constants/routes';
import { changeRoute, userSet, balanceSet } from '../../app-state/store';
import { login } from '../../services/auth';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Sincere@april.biz', // for example 
      pass: 'password',
      validEmail: true,
      validPass: true,
      loginErr: ''
    }
  }

  register = () => {
    this.props.routeTo(ROUTES.REGISTRATION);
  }

  loginUser = () => {
    const { email, pass } = this.state;
    let validEmail = email.length !== 0,
      validPass = pass.length !== 0;

    if (validEmail && validPass) {
      const loginResult = login(email, pass);

      if (loginResult.code == 0) {
        this.props.setLocalUser(loginResult.data.user);
        this.props.setBalance(loginResult.data.user.balance);
        this.props.routeTo(ROUTES.DASHBOARD);
      }
      else {
        this.setState({
          loginErr: loginResult.err
        })
      }

    }
    else {
      this.setState({
        validEmail,
        validPass,
        loginErr: ''
      })
    }
  }

  changeEmail = (_, email) => {
    this.setState({
      email,
      validEmail: !!email.length,
      loginErr: ''
    })
  }
  changePass = (_, pass) => {
    this.setState({
      pass,
      validPass: !!pass.length,
      loginErr: ''
    })
  }

  render() {
    const { validEmail,
      validPass,
      loginErr,
      email,
      pass } = this.state;
    return (
      <section className="df h100">
        <form method="post" action="/">
          <AuthForm
            title={'Login to account'}
            submitTitle={'login'}
            submit={this.loginUser}
            disabled={!(validEmail && validPass)}
            errorText={loginErr}
          >
            <TextField
              value={email}
              hintText="input your e-mail"
              floatingLabelText="E-mail"
              onChange={this.changeEmail}
              errorText={validEmail ? '' : 'required field'}
            />
            <TextField
              value={pass}
              hintText="input password"
              floatingLabelText="Password"
              type="password"
              onChange={this.changePass}
              errorText={validPass ? '' : 'required field'}
            />
          </AuthForm>
          <FlatButton
            label="register"
            primary={true}
            onTouchTap={this.register}
          />
        </form>
      </section>
    )
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    routeTo: routePath => dispatch(changeRoute(routePath)),
    setLocalUser: user => dispatch(userSet(user)),
    setBalance: amount => dispatch(balanceSet(amount))
  }
}

export default connect(null, mapDispatchToProps)(Authentication);