import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import AuthForm from '../../components/AuthForm'

import { ROUTES } from '../../constants/routes';
import { changeRoute, userSet, balanceSet, addUser } from '../../app-state/store';
import { addUserToList } from '../../services/users';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pass: '',
      confirmPass: '',
      validName: true,
      validEmail: true,
      validPass: true,
      validConfirmPass: true,
      regErr: ''
    }
  }

  registrate = () => {
    const {
      name,
      email,
      pass,
      confirmPass
    } = this.state;

    let validEmail = (/[\w\-\._]+@[\w\-\._]+\.\w{2,10}/).test(email),
      validName = name.length !== 0,
      validPass = pass.length !== 0,
      validConfirmPass = pass === confirmPass;

    const isValid = (validEmail && validName && validPass && validConfirmPass);

    if (isValid) {
      const regResult = addUserToList({ name, email, password: pass, balance: 500 }); // TODO: User adds on server

      if (regResult) {
        this.props.setLocalUser(regResult);
        this.props.setBalance(regResult.balance);
        this.props.addLocalUser(regResult);
        this.props.routeTo(ROUTES.DASHBOARD);
      }
      else {
        this.setState({
          regErr: regResult
        })
      }

    }
    else {
      this.setState({
        validName,
        validEmail,
        validPass,
        validConfirmPass,
        regErr: ''
      })
    }
  }

  changeName = (_, name) => {
    this.setState({
      name,
      validName: !!name.length,
      regErr: ''
    })
  }
  changeEmail = (_, email) => {
    this.setState({
      email,
      validEmail: (/[\w\-\._]+@[\w\-\._]+\.\w{2,10}/).test(email), // very simple email validation
      regErr: ''
    })
  }
  changePass = (_, pass) => {
    this.setState({
      pass,
      validPass: !!pass.length,
      regErr: ''
    })
  }
  changeConfirmPass = (_, confirmPass) => {
    this.setState({
      confirmPass,
      validConfirmPass: confirmPass === this.state.pass,
      regErr: ''
    })
  }


  render() {
    const {
      validEmail,
      validPass,
      validName,
      validConfirmPass,
      regErr
    } = this.state;

    const isValid = (validEmail && validPass && validName && validConfirmPass)

    return (
      <section className="df h100">
        <form>
          <AuthForm
            title={'Registration'}
            submitTitle={'register'}
            submit={this.registrate}
            disabled={!isValid}
            errorText={regErr}
          >
            <TextField
              hintText="input your name"
              floatingLabelText="Name"
              onChange={this.changeName}
              errorText={validName ? '' : 'required field'}
            />
            <TextField
              hintText="input your e-mail"
              floatingLabelText="E-mail"
              onChange={this.changeEmail}
              errorText={validEmail ? '' : 'not in the format'}
            />
            <TextField
              hintText="input password"
              floatingLabelText="Password"
              type="password"
              onChange={this.changePass}
              errorText={validPass ? '' : 'required field'}
            />
            <TextField
              hintText="repeat password"
              floatingLabelText="Confirm password"
              type="password"
              onChange={this.changeConfirmPass}
              errorText={validConfirmPass ? '' : 'not equal to pass'}
            />
          </AuthForm>
        </form>
      </section>
    )
  }
}
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    routeTo: routePath => dispatch(changeRoute(routePath)),
    setLocalUser: user => dispatch(userSet(user)),
    setBalance: amount => dispatch(balanceSet(amount)),
    addLocalUser: user => dispatch(addUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Registration);