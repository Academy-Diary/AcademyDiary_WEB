import React, { useState } from 'react';

import { Typography, Box, Tabs, Tab, List, ListItemText } from '@mui/material';

const unpaidList = [
  { name: '신짱구', amount: 250000, class: '수학 종합반', due: '2024.01.01~2024.01.31' },
  { name: '신짱아', amount: 250000, class: '국어 종합반', due: '2024.01.01~2024.01.31' },
  { name: '흰둥이', amount: 250000, class: '영어 종합반', due: '2024.01.01~2024.01.31' },
];
const paidList = [
  { name: '권해담', amount: 250000, class: '수학 종합반', due: '2024.01.01~2024.01.31' },
  { name: '이하람', amount: 250000, class: '국어 종합반', due: '2024.01.01~2024.01.31' },
];

function TabPanel({ value, index, children }) {
  return <div>{value === index && <Box>{children}</Box>}</div>;
}

export default function PaymentList() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (e, newVal) => {
    setTabIndex(newVal);
  };

  return (
    <>
      <Typography variant="h6" sx={{ pt: 2, pb: 3 }}>
        학원비 납부 목록
      </Typography>
      <Box>
        <Box>
          <Tabs value={tabIndex} onChange={handleChangeTab}>
            <Tab label="미납 목록" sx={{ width: 150 }} />
            <Tab label="납부 완료" sx={{ width: 150 }} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <List>
            {unpaidList.map((unpaid) => (
              <Box sx={{ display: 'flex', p: 2, my: 2, backgroundColor: 'lightgray' }}>
                <ListItemText primary={unpaid.name} secondary={`수강반: ${unpaid.class}/ 기간: ${unpaid.due}`} />
                <ListItemText align="right" primary={unpaid.amount} secondary="미납" sx={{ mb: 2 }} />
              </Box>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <List>
            {paidList.map((unpaid) => (
              <Box sx={{ display: 'flex', p: 2, my: 2, backgroundColor: 'lightgray' }}>
                <ListItemText primary={unpaid.name} secondary={`수강반: ${unpaid.class}/ 기간: ${unpaid.due}`} />
                <ListItemText align="right" primary={unpaid.amount} secondary="납부 완료" sx={{ mb: 2 }} />
              </Box>
            ))}
          </List>
        </TabPanel>
      </Box>
    </>
  );
}
