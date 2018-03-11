import React from 'react'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { indigo500 } from 'material-ui/styles/colors';

const CHIP_STYLE = {
  margin: 16
};

export default ({ amount, currency }) => {
  return (
    <Chip style={CHIP_STYLE}>
      <Avatar size={32} backgroundColor={indigo500}>{currency || 'Co'}</Avatar>
      {amount !== undefined ? amount : '###'}
    </Chip>
  )
}
