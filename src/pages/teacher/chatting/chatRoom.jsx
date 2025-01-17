import React, { useEffect, useState } from 'react';
import { Avatar, Box, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { AssignmentInd } from '@mui/icons-material';
import socket from '../../../components/socket';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useAttendeeList, useAttendeeParentList } from '../../../api/queries/lectures/useAttendeeList';
import { useProfileImage } from '../../../api/queries/user/useProfile';

// const students = [
//   { id: 1, name: '김대성' },
//   { id: 2, name: '김민수' },
//   { id: 3, name: '김선우' },
//   { id: 4, name: '권해담' },
//   { id: 5, name: '이태윤' },
//   { id: 6, name: '서민석' },
// ];

export default function ChatRoom() {
  const { user, lectures } = useUserAuthStore();
  const [nowMessage, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [students, setStudents ] = useState();
  const [selectLectureId, setLectureSelect] = useState(lectures[0].lecture_id);
  const [selectRole, setRoleSelect] = useState('STUDENT');
  const { data: students } = useAttendeeList(selectLectureId);
  const { data: parents } = useAttendeeParentList(selectLectureId);
  const [nowSelect, setSelect] = useState({ user_id: 0, user_name: '학생 선택' });

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
    console.log(selectRole);
    if (selectRole === 'STUDENT') {
      const selectedStudent = students.find((n) => n.user_id === id);

      console.log(id);

      // 현재 선택된 방과 다른 방을 클릭한 경우만 실행
      if (nowSelect.user_id !== selectedStudent.user_id) {
        // 기존 방을 나가기
        socket.emit('leave room', { roomId: nowSelect.user_id, userId: user.user_id });

        // 새로운 방에 조인
        socket.emit('create or join room', { roomId: selectedStudent.user_id, userId: user.user_id });

        // 새로운 방의 이전 메시지 요청
        socket.emit('get messages', { roomId: selectedStudent.user_id });

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
    } else {
      const selectedStudent = parents.find((n) => n.parent_id === id);

      console.log('parent', selectedStudent);

      // 현재 선택된 방과 다른 방을 클릭한 경우만 실행
      if (nowSelect.parent_id !== selectedStudent.parent_id) {
        // 기존 방을 나가기
        socket.emit('leave room', { roomId: nowSelect.parent_id, userId: user.user_id });

        // 새로운 방에 조인
        socket.emit('create or join room', { roomId: selectedStudent.parent_id, userId: user.user_id });

        // 새로운 방의 이전 메시지 요청
        socket.emit('get messages', { roomId: selectedStudent.parent_id });

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
    }
  };

  const sendMessage = (e) => {
    if (nowSelect.user_id === 0 || nowSelect.parent_id === 0) {
      alert('채팅을 보낼 학생을 선택하세요');
      return;
    }
    if (e.keyCode === 13 && nowMessage.trim() !== '') {
      const messageData = {
        roomId: selectRole === 'STUDENT' ? nowSelect.user_id : nowSelect.parent_id,
        message: nowMessage,
        userId: user.user_id,
        time: new Date().toLocaleTimeString(),
        myMessage: true, // 내가 보낸 메시지임을 명시
      };

      // 서버로 메시지 전송
      socket.emit('chat message', messageData);

      // 로컬 상태에 즉시 메시지 추가
      // setMessages((prevMessages) => [...prevMessages, messageData]);

      setMessage('');
    }
  };

  const handleLectureSelect = (e) => {
    setLectureSelect(e.target.value);
  };

  const handleRoleSelect = (e) => {
    setRoleSelect(e.target.value);
    // 메세지 리스트 삭제
    setMessages([]);
  };

  return (
    <>
      <Title title="채팅 상담" />
      <Grid container>
        <Grid item md={3} sx={{ height: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
          <Grid container>
            <TextField select defaultValue={lectures[0].lecture_id} fullWidth onChange={handleLectureSelect}>
              {lectures.map((lecture) => (
                <MenuItem key={lecture.lecture_id} value={lecture.lecture_id}>
                  {lecture.lecture_name}
                </MenuItem>
              ))}
            </TextField>
            <FormControl fullWidth sx={{ alignItems: 'center' }}>
              <FormLabel id="demo-radio-buttons-group-label">학생/학부모 구분</FormLabel>
              <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="STUDENT" name="radio-buttons-group" onChange={handleRoleSelect}>
                <FormControlLabel value="STUDENT" control={<Radio sx={{ '&.Mui-checked': { color: '#006336' } }} />} label="학생" />
                <FormControlLabel value="PARENT" control={<Radio sx={{ '&.Mui-checked': { color: '#006336' } }} />} label="학부모" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {selectRole === 'STUDENT'
            ? students?.map((student) => (
                <Box key={student.user_id} sx={{ width: '95%', height: '50px', margin: '10px', backgroundColor: '#EEEEEE', pt: '8px' }} onClick={() => handleNameClick(student.user_id)}>
                  <Typography variant="h6" textAlign="left" pl="10px" fontFamily="Pretendard-Regular">
                    {student.user_name}
                  </Typography>
                </Box>
              ))
            : parents?.map((parent) => (
                <Box key={parent.parent_id} sx={{ width: '95%', height: '50px', margin: '10px', backgroundColor: '#EEEEEE', pt: '8px' }} onClick={() => handleNameClick(parent.parent_id)}>
                  <Typography variant="h6" textAlign="left" pl="10px" fontFamily="Pretendard-Regular">
                    {parent.parent_name} ({parent.student_name}&apos;s parent)
                  </Typography>
                </Box>
              ))}
        </Grid>
        <Grid item md={9} sx={{ height: '80vh' }}>
          <Box sx={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE', ml: '10px' }}>
            <Typography variant="h4" sx={{ padding: '10px' }} fontFamily="Pretendard-Regular">
              {selectRole === 'STUDENT' ? nowSelect.user_name : `${nowSelect.parent_name}`}
            </Typography>
            <Stack alignItems="center">
              <Box sx={{ width: '90%', height: '65vh', backgroundColor: '#ffffff', overflowY: 'auto', overflowX: 'hidden' }}>
                <Stack sx={{ padding: '5px' }}>
                  {messages.map((message, index) => {
                    if (selectRole === 'STUDENT')
                      return <MessageBox key={`${message.time}-${Math.random()}`} name={nowSelect.user_name} msg={message.message} myMessage={message.myMessage} time={message.time} />;
                    return <MessageBox key={`${message.time}-${Math.random()}`} name={nowSelect.parent_name} msg={message.message} myMessage={message.myMessage} time={message.time} />;
                  })}
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
  const { data: profileImg } = useProfileImage(user.user_id);

  const [imgUrl, setImgUrl] = useState('');

  useState(() => {
    if (profileImg) setImgUrl(profileImg);
  }, [profileImg]);

  return myMessage ? (
    <Grid container sx={{ margin: '10px' }}>
      <Avatar src={imgUrl} sx={{ width: 40, height: 40 }} />
      <Grid item sx={{ marginLeft: '5px' }}>
        <Grid container sx={{ width: '10vw', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" color="#10ba23" fontWeight="bold" fontFamily="Pretendard-Regular">
            {user.user_name}(강사)
          </Typography>
          <Typography variant="caption" fontFamily="Pretendard-Regular">
            {time}
          </Typography>
        </Grid>
        <Typography variant="body1" fontFamily="Pretendard-Regular">
          {msg}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Grid container sx={{ margin: '10px' }}>
      <Avatar sx={{ width: 40, height: 40 }}>
        <AssignmentInd />
      </Avatar>
      <Grid item sx={{ marginLeft: '5px' }}>
        <Grid container sx={{ width: '10vw', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" color="#102fba" fontWeight="bold" fontFamily="Pretendard-Regular">
            {name}
          </Typography>
          <Typography variant="caption" fontFamily="Pretendard-Regular">
            {time}
          </Typography>
        </Grid>
        <Typography variant="body1" fontFamily="Pretendard-Regular">
          {msg}
        </Typography>
      </Grid>
    </Grid>
  );
}
