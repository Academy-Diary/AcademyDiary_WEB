import React, { useState } from 'react';

import { Grid, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Checkbox, Button, Paper } from '@mui/material';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

/**
 * 수강생 등록을 위한 양식 컴포넌트
 *
 * @param {List} left - 왼쪽 학생 객체(name, phone 속성 포함) 리스트
 * @param {List} right - 오른쪽 학생 객체(name, phone 속성 포함) 리스트
 */

export default function TransferList({ leftTitle, rightTitle, left, right, setLeft, setRight }) {
  const [checked, setChecked] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items, title) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list" subheader={<ListSubheader component="div">{title}</ListSubheader>}>
        {items && items.length > 0
          ? items.map((obj) => {
              const value = `${obj.user_name}(${obj.phone_number.substr(9)})`;
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItemButton key={value} role="listitem" onClick={handleToggle(obj)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(obj) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItemButton>
              );
            })
          : null}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item>{customList(left, leftTitle)}</Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: 'center' }}>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllRight} disabled={left.length === 0} aria-label="move all right">
            ≫
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedRight} disabled={leftChecked.length === 0} aria-label="move selected right">
            &gt;
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleCheckedLeft} disabled={rightChecked.length === 0} aria-label="move selected left">
            &lt;
          </Button>
          <Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={handleAllLeft} disabled={right.length === 0} aria-label="move all left">
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, rightTitle)}</Grid>
    </Grid>
  );
}
