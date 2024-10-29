import React, { useState } from 'react';
import { Avatar, Box, Grid, Stack, TextField, Typography } from '@mui/material';
import { AssignmentInd } from '@mui/icons-material';
import { Title, TitleMedium } from '../../../components';

const students = [
  { id: 1, name: '김대성' },
  { id: 2, name: '김민수' },
  { id: 3, name: '김선우' },
  { id: 4, name: '권해담' },
  { id: 5, name: '이태윤' },
  { id: 6, name: '서민석' },
];
const messages = [
  { text: '안녕하세요', myMessage: false, time: '18:00' },
  { text: '안녕하세요', myMessage: true, time: '18:00' },
  { text: '강사 OOO입니다.', myMessage: true, time: '18:01' },
]; // myMessage : 내가 보낸 메세지인지 여부

export default function ChatRoom() {
  const [nowSelect, setSelect] = useState(students[0]);
  const [nowMessage, setMessage] = useState('');

  const handleNameClick = (id) => {
    setSelect(students.filter((n) => n.id === id)[0]);
  };
  const sendMessage = (value) => {
    if (value.keyCode === 13 && nowMessage !== '') {
      console.log(nowMessage);
      console.log(value);
      setMessage('');
    }
  };

  return (
    <>
      <Title title="채팅 상담" />
      <Grid container>
        <Grid item md={3} sx={{ height: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
          {/* 여기 목록은 아마 학생이나 학부모가 먼저 채팅을 시작해야 나오도록.. */}
          {students.map((student) => (
            <Box sx={{ width: '95%', height: '50px', margin: '10px', backgroundColor: '#b9b9b9', pt: '8px' }} onClick={() => handleNameClick(student.id)}>
              <Typography variant="h6" textAlign="left" pl="10px">
                {student.name}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item md={9} sx={{ height: '80vh' }}>
          <Box sx={{ width: '100%', height: '100%', backgroundColor: '#b9b9b9', ml: '10px' }}>
            <Typography variant="h4" sx={{ padding: '10px' }}>
              {nowSelect.name}
            </Typography>
            <Stack alignItems="center">
              <Box sx={{ width: '90%', height: '65vh', backgroundColor: '#ffffff', overflowY: 'auto', overflowX: 'hidden' }}>
                <Stack sx={{ padding: '5px' }}>
                  {messages.map((message) => (
                    <MessageBox name={nowSelect.name} msg={message.text} myMessage={message.myMessage} time={message.time} />
                  ))}
                </Stack>
              </Box>
              <TextField
                sx={{ width: '90%', backgroundColor: '#ffffff' }}
                margin="dense"
                size="small"
                label="메세지 입력(엔터로 전송)"
                variant="filled"
                onKeyDown={(data) => sendMessage(data)}
                onChange={(e) => setMessage(e.target.value)}
                value={nowMessage}
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

function MessageBox({ name, msg, myMessage, time }) {
  if (myMessage) {
    // 강사가 보낸 메세지일 때
    return (
      <Grid container sx={{ margin: '10px' }}>
        <Avatar sx={{ width: 40, height: 40 }} />
        <Grid item sx={{ marginLeft: '5px' }}>
          <Grid container sx={{ width: '10vw', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" color="#10ba23" fontWeight="bold">
              강사이름
            </Typography>
            <Typography variant="caption">{time}</Typography>
          </Grid>
          <Typography variant="body1">{msg}</Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container sx={{ margin: '10px' }}>
      <Avatar sx={{ width: 40, height: 40 }}>
        <AssignmentInd />
      </Avatar>
      <Grid item sx={{ marginLeft: '5px' }}>
        <Grid container sx={{ width: '10vw', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" color="#102fba" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="caption">{time}</Typography>
        </Grid>
        <Typography variant="body1">{msg}</Typography>
      </Grid>
    </Grid>
  );
}
