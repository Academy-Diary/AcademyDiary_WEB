import React, { useEffect, useState } from 'react';
import { Avatar, Box, Grid, Stack, TextField, Typography } from '@mui/material';
import { AssignmentInd } from '@mui/icons-material';
import socket from '../../../components/socket';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';

const students = [
  { id: 1, name: '김대성' },
  { id: 2, name: '김민수' },
  { id: 3, name: '김선우' },
  { id: 4, name: '권해담' },
  { id: 5, name: '이태윤' },
  { id: 6, name: '서민석' },
];

export default function ChatRoom() {
  const { user } = useUserAuthStore();
  const [nowSelect, setSelect] = useState(students[0]);
  const [nowMessage, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 서버에서 수신한 실시간 메시지를 상태에 추가
    socket.on('chat message', (msg) => {
      const isMyMessage = msg.userId === user.user_id;
      setMessages((prevMessages) => [...prevMessages, { ...msg, myMessage: isMyMessage }]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [user.user_id]);

  const handleNameClick = (id) => {
    const selectedStudent = students.find((n) => n.id === id);

    // 현재 선택된 방과 다른 방을 클릭한 경우만 실행
    if (nowSelect.id !== selectedStudent.id) {
      // 기존 방을 나가기
      socket.emit('leave room', { roomId: nowSelect.id, userId: user.user_id });

      // 새로운 방에 조인
      socket.emit('create or join room', { roomId: selectedStudent.id, userId: user.user_id });

      // 새로운 방의 이전 메시지 요청
      socket.emit('get messages', { roomId: selectedStudent.id });

      // 서버에서 수신한 메시지 업데이트
      socket.on('all messages', (msgs) => {
        const formattedMessages = msgs.map((msg) => ({
          ...msg,
          myMessage: msg.userId === user.user_id,
        }));
        setMessages(formattedMessages);
      });

      // 선택된 방 상태 업데이트
      setSelect(selectedStudent);
    }
  };

  const sendMessage = (e) => {
    if (e.keyCode === 13 && nowMessage.trim() !== '') {
      const messageData = {
        roomId: nowSelect.id,
        message: nowMessage,
        userId: user.user_id,
        time: new Date().toLocaleTimeString(),
        myMessage: true, // 내가 보낸 메시지임을 명시
      };

      // 서버로 메시지 전송
      socket.emit('chat message', messageData);

      // 로컬 상태에 즉시 메시지 추가
      setMessages((prevMessages) => [...prevMessages, messageData]);

      setMessage('');
    }
  };

  return (
    <>
      <Title title="채팅 상담" />
      <Grid container>
        <Grid item md={3} sx={{ height: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
          {students.map((student) => (
            <Box key={student.id} sx={{ width: '95%', height: '50px', margin: '10px', backgroundColor: '#b9b9b9', pt: '8px' }} onClick={() => handleNameClick(student.id)}>
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
                  {messages.map((message, index) => (
                    <MessageBox key={`${message.time}-${Math.random()}`} name={nowSelect.name} msg={message.message} myMessage={message.myMessage} time={message.time} />
                  ))}
                </Stack>
              </Box>
              <TextField
                sx={{ width: '90%', backgroundColor: '#ffffff' }}
                margin="dense"
                size="small"
                label="메세지 입력(엔터로 전송)"
                variant="filled"
                onKeyDown={sendMessage}
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
  const { user } = useUserAuthStore();
  return myMessage ? (
    <Grid container sx={{ margin: '10px' }}>
      <Avatar sx={{ width: 40, height: 40 }} />
      <Grid item sx={{ marginLeft: '5px' }}>
        <Grid container sx={{ width: '10vw', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" color="#10ba23" fontWeight="bold">
            {user.user_name}(강사)
          </Typography>
          <Typography variant="caption">{time}</Typography>
        </Grid>
        <Typography variant="body1">{msg}</Typography>
      </Grid>
    </Grid>
  ) : (
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
