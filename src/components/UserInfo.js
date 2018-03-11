import React, { Fragment } from 'react'
import { CardHeader } from 'material-ui/Card';

export default (props) => {
  return (
    <Fragment>
      <CardHeader
        title={props.name || 'User Name'}
        subtitle={props.email || 'user@e-mail.fake'}
        avatar={props.avatar || 'http://lorempixel.com/output/200/200/animals/'}
        textStyle={{ paddingRight: 0 }}
      />
    </Fragment>
  )
}
