import React, { useState } from 'react';
import { Box, Button, Typography, Link, Grid, TextField, InputAdornment, IconButton, Alert, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCheckDuplicate, useSignup } from '../../api/queries/user/useSignup';
import { LogoTitle } from '../../components';

export default function SignUp() {
  // 0: 선택화면, 1: 회원가입화면 2: 완료화면
  const [status, setStatus] = useState(0);
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');

  const handleSelect = (pos) => {
    setStatus(1);
    setPosition(pos);
  };

  return (
    <>
      <LogoTitle mb={3} />
      {status === 0 && <SelectPosition handleSelect={handleSelect} />}
      {status === 1 && <SignupForm position={position} setStatus={setStatus} setName={setName} />}
      {status === 2 && <Succeed name={name} position={position} />}
    </>
  );
}

function SelectPosition({ handleSelect }) {
  return (
    <>
      <Typography variant="h5" align="center" mb={20}>
        회원가입
      </Typography>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleSelect('CHIEF')}>
        학원 대표
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth onClick={() => handleSelect('TEACHER')}>
        학원 강사
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            이미 계정이 있으신가요? 로그인
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

// 회원가입 request body
// {
//   "user_id": "john_doe_123",
//   "email": "john.doe@example.com",
//   "birth_date": "2000-01-01T00:00:00Z", //ISO 8601형식으로 입력되어야 함!! 그래야 시간 오차 안생김
//   "user_name": "John Doe",
//   "password": "$2b$10$uE3xvfH4SsvoeIS9phH6N.NADvpWfM/WG10FMeZQhCBcKS3P5QoB2",
//   "phone_number": "010-1234-5678",
//   "role": "STUDENT"
// }

function SignupForm({ position, setStatus, setName }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [duplicated, setDuplicated] = useState(false);
  const [checkedDup, setCheckedDup] = useState(false); // 중복체크 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 스핀

  const checkDupMutation = useCheckDuplicate();
  const signupMutation = useSignup();

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  // 아이디 중복체크
  const handleChangeUserId = (e) => {
    setUserId(e.target.value);
    setCheckedDup(false); // 변경할 때마다 다시 중복체크 필요
  };
  const handleCheckDup = () => {
    checkDupMutation.mutate(userId, {
      onSuccess: () => {
        setCheckedDup(true); // 체크 완료
        setDuplicated(false);
      },
      onError: (error) => {
        setCheckedDup(true); // 체크 완료
        setDuplicated(true);
        console.log(error.message);
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!checkedDup) alert('아이디 중복 확인을 해주세요.');
    else if (duplicated) alert('사용 가능한 아이디로 다시 시도해주세요.');
    else if (data.get('password') !== data.get('password2')) alert('입력한 두 비밀번호가 일치하지 않습니다.');
    else {
      const submitData = {
        user_id: data.get('userid'),
        password: data.get('password'),
        user_name: data.get('name'),
        birth_date: birthDate.toISOString(),
        email: data.get('email'),
        phone_number: data.get('phonenumber'),
        role: position,
      };

      // console.log(submitData);
      setIsLoading(true);
      signupMutation.mutate(submitData, {
        onSuccess: (res) => {
          setIsLoading(false);
          setName(submitData.user_name);
          setStatus(2);
          // console.log(res.message);
        },
        onError: (error) => {
          setIsLoading(false);
          if (error.errorCode === 409) alert('이미 등록된 이메일(전화번호)입니다. \n다른 이메일(전화번호)로 다시 시도해주세요.');
          else alert('서버 오류로 회원가입에 실패하였습니다. \n나중에 다시 시도해주세요.');
          // console.log(error.message);
        },
      });
    }
  };

  return (
    <>
      <Typography variant="h6" align="center" mb={2}>
        {position === 'CHIEF' ? '학원 대표 ' : '강사 '}회원가입
      </Typography>
      {isLoading && <CircularProgress />}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField name="userid" id="userid" label="아이디" required fullWidth autoFocus onChange={handleChangeUserId} error={duplicated} />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" size="large" sx={{ m: 1 }} onClick={handleCheckDup}>
              중복 확인
            </Button>
          </Grid>
          {checkedDup && (
            <Grid item xs={12}>
              {duplicated ? <Alert severity="error">이미 사용 중인 아이디입니다.</Alert> : <Alert severity="success">사용 가능한 아이디입니다.</Alert>}
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
              fullWidth
              name="password"
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              id="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              name="password2"
              label="비밀번호 확인"
              id="password2"
            />
          </Grid>
          <PersonalInfo title="개인 정보" birthDate={birthDate} setBirthDate={setBirthDate} />
        </Grid>
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
          가입하기
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 1, mb: 3 }}>
          <Grid item>
            <Button variant="text" onClick={() => setStatus(0)}>
              이전 화면으로
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function PersonalInfo({ title, birthDate, setBirthDate }) {
  return (
    <>
      <Grid item xs={12} mt={2}>
        <Typography fontWeight="medium">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField name="name" required fullWidth id="name" label="이름" />
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="생년월일" name="birthdate" maxDate={dayjs()} value={birthDate} onChange={(newValue) => setBirthDate(newValue)} />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField required fullWidth id="email" label="이메일 주소" name="email" />
      </Grid>
      <Grid item xs={12}>
        <TextField required fullWidth id="phonenumber" label="전화번호" name="phonenumber" />
      </Grid>
    </>
  );
}

function Succeed({ name, position }) {
  return (
    <Box>
      <Typography variant="h5" align="center" mb={20}>
        {name}
        {position === 'director' && '(원장)'}
        {position === 'teacher' && '(강사)'}
        님, <br />
        회원가입이 완료되었습니다!
      </Typography>
      <Button variant="contained" size="large" fullWidth href="/login">
        로그인하기
      </Button>
    </Box>
  );
}
