import React, { Fragment } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Down from 'material-ui/svg-icons/navigation/arrow-downward';
import Up from 'material-ui/svg-icons/navigation/arrow-upward';
import { cyan500 } from 'material-ui/styles/colors';

export default ({ dataKey, label, filtrate, sort, selected, direction }) => {
  const setSort = (_, isInputChecked) => {
    const direction = isInputChecked ? 'ASC' : 'DESC';
    sort(dataKey, direction);
    return;
  };

  let labelStyle = {
    fontSize: '14px',
    paddingRight: 2
  }
  if (selected) {
    labelStyle.color = '#00BCD4'
  }

  return (
    <Fragment>
      <Checkbox
        value="sort"
        label={label}
        labelPosition="left"
        labelStyle={labelStyle}
        checkedIcon={<Up />}
        uncheckedIcon={<Down style={{ fill: selected ? '#00BCD4' : 'rgba(0, 0, 0, 0.87)' }} />}
        disableTouchRipple
        onCheck={setSort}
        checked={direction === 'ASC' && selected}
      />
      <TextField
        hintText="search"
        style={{ fontWeight: 'normal' }}
        fullWidth
        onChange={filtrate}
      />
    </Fragment>
  )
}
