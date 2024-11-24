import React, { useState } from 'react';

import { Box, Tabs, Tab, List, ListItemText } from '@mui/material';

import { TitleMedium } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useBillList } from '../../../api/queries/tuitionFees/useBillList';

// const billList = [
//   {
//     "bill_id": 0,
//     "deadline": "2024-11-21",
//     "amount": 0,
//     "paid": true,
//     "user_name": "string",
//     "class_name": [
//       "string"
//     ]
//   },
// ];

function TabPanel({ value, index, children }) {
  return <div>{value === index && <Box>{children}</Box>}</div>;
}

export default function PaymentList() {
  const [tabIndex, setTabIndex] = useState(0);

  const { user } = useUserAuthStore();
  const { data: paidBills } = useBillList(user.academy_id, true);
  const { data: unpaidBills } = useBillList(user.academy_id, false);

  const handleChangeTab = (e, newVal) => {
    setTabIndex(newVal);
  };

  return (
    <>
      <TitleMedium title="학원비 납부 목록" />
      <Box>
        <Box>
          <Tabs value={tabIndex} onChange={handleChangeTab}>
            <Tab label="미납 목록" sx={{ width: 150 }} />
            <Tab label="납부 완료" sx={{ width: 150 }} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {unpaidBills?.map((unpaid) => (
              <Box key={unpaid.bill_id} sx={{ display: 'flex', p: 2, my: 2, backgroundColor: 'lightgray' }}>
                <ListItemText primary={unpaid.user_name} secondary={`수강반: ${unpaid.class_name.join(', ')}/ 기간: ${unpaid.deadline.split('T')[0]}`} />
                <ListItemText align="right" primary={unpaid.amount} secondary="미납" sx={{ mb: 2 }} />
              </Box>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {paidBills?.map((paid) => (
              <Box key={paid.bill_id} sx={{ display: 'flex', p: 2, my: 2, backgroundColor: 'lightgray' }}>
                <ListItemText primary={paid.user_name} secondary={`수강반: ${paid.class_name.join(', ')}/ 기간: ${paid.deadline.split('T')[0]}`} />
                <ListItemText align="right" primary={paid.amount} secondary="납부 완료" sx={{ mb: 2 }} />
              </Box>
            ))}
          </List>
        </TabPanel>
      </Box>
    </>
  );
}
