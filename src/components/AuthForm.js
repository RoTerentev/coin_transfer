import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

export default (props) => (
  <Card>
    <AppBar
      title={props.title || 'Form'}
      showMenuIconButton={false}
    />
    <div className="df f-dir-col p10">
      {props.children}
      <CardText>
        <p className="color-err">{props.errorText}</p>
      </CardText>
      <CardActions>
        <RaisedButton
          label={props.submitTitle || 'submit'}
          primary={true}
          onTouchTap={props.submit}
          disabled={props.disabled}
        />
      </CardActions>
    </div>
  </Card>
);