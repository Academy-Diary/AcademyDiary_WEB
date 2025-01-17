import React, { useEffect, useState } from 'react';

import { Box, Tabs, Tab, List, ListItemText, Checkbox, Button, styled } from '@mui/material';

import { SimpleDialog, TitleMedium } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useBillList } from '../../../api/queries/tuitionFees/useBillList';
import { useUpdatePaid } from '../../../api/queries/tuitionFees/useUpdatePaid';
import Colors from '../../../styles/colors';

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

const RedListItemText = styled(ListItemText)({
  '& .MuiTypography-body2': {
    color: Colors.Red, // secondary 텍스트의 색상만 변경
  },
});
const BlueListItemText = styled(ListItemText)({
  '& .MuiTypography-body2': {
    color: Colors.Blue, // secondary 텍스트의 색상만 변경
  },
});

function TabPanel({ value, index, children }) {
  return <div>{value === index && <Box>{children}</Box>}</div>;
}

export default function PaymentList() {
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  // 미납목록 선택을 위한 state들
  const [checkedBills, setCheckedBills] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const { user } = useUserAuthStore();
  const { data: paidBills, isSuccess: paidIsSuccess, refetch: refetchPaid } = useBillList(user.academy_id, true);
  const { data: unpaidBills, isSuccess: unpaidIsSuccess, refetch: refetchUnpaid } = useBillList(user.academy_id, false);
  const updatePaidMutation = useUpdatePaid(user.academy_id);

  useEffect(() => {
    // 전체선택 여부 체크
    if (unpaidBills && checkedBills.length === unpaidBills.length) setAllChecked(true);
    else setAllChecked(false);
  }, [unpaidBills, checkedBills]);

  const handleChangeTab = (e, newVal) => {
    setTabIndex(newVal);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCheckBill = (bill) => {
    const currentIdx = checkedBills.indexOf(bill);
    const newChecked = [...checkedBills];

    if (currentIdx === -1) newChecked.push(bill);
    else newChecked.splice(currentIdx, 1);

    setCheckedBills(newChecked);
  };
  const handleCheckAll = () => {
    setCheckedBills(allChecked ? [] : unpaidBills);
    setAllChecked(!allChecked);
  };

  const handleClickUpdate = () => {
    if (unpaidBills && checkedBills.length > 0) setOpen(true);
    else alert('납부 완료 처리할 청구서를 선택해주세요!');
  };
  const handleUpdatePaid = () => {
    const billIds = checkedBills.map((bill) => bill.bill_id);
    updatePaidMutation.mutate(billIds, {
      onSuccess: () => {
        setCheckedBills([]);
        refetchPaid();
        refetchUnpaid();

        alert('납부완료 처리 성공!');
        handleCloseDialog();
      },
      onError: () => {
        alert('납부완료 처리 실패!');
      },
    });
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {unpaidIsSuccess && (
              <>
                <Button onClick={handleCheckAll}>{allChecked ? '전체해제' : '전체선택'}</Button>
                <Button variant="contained" onClick={handleClickUpdate}>
                  납부 완료
                </Button>
              </>
            )}
          </Box>
          <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {unpaidIsSuccess
              ? unpaidBills.map((unpaid) => (
                  <Box key={unpaid.bill_id} onClick={() => handleCheckBill(unpaid)} sx={{ display: 'flex', p: 2, mb: 2, backgroundColor: Colors.LightGrey }}>
                    <Checkbox checked={checkedBills.indexOf(unpaid) !== -1} />
                    <ListItemText primary={unpaid.user_name} secondary={`수강반: ${unpaid.class_name.join(', ')}/ 기간: ${unpaid.deadline.split('T')[0]}`} />
                    <RedListItemText align="right" primary={unpaid.amount} secondary="미납" sx={{ mb: 2 }} />
                  </Box>
                ))
              : []}
          </List>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <List sx={{ maxHeight: '60vh', overflow: 'auto', mt: 2 }}>
            {paidIsSuccess
              ? paidBills.map((paid) => (
                  <Box key={paid.bill_id} sx={{ display: 'flex', p: 2, mb: 2, backgroundColor: Colors.LightGrey }}>
                    <ListItemText primary={paid.user_name} secondary={`수강반: ${paid.class_name.join(', ')}/ 기간: ${paid.deadline.split('T')[0]}`} />
                    <BlueListItemText align="right" primary={paid.amount} secondary="납부 완료" sx={{ mb: 2 }} />
                  </Box>
                ))
              : []}
          </List>
        </TabPanel>
        <SimpleDialog
          openDialog={open}
          handleClose={handleCloseDialog}
          text={`${checkedBills[0]?.user_name} 외 ${checkedBills.length - 1}명의 청구서를 납부 완료 처리하겠습니까?`}
          second="확인"
          handleClickSecond={handleUpdatePaid}
        />
      </Box>
    </>
  );
}
