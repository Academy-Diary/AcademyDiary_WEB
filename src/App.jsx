import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Director, Teacher } from './components';
import {
  StartPage,
  Login,
  SignUp,
  Register,
  NotFound,
  DirectorHome,
  TeacherHome,
  ClassHome,
  ClassPage,
  TestList,
  CourseNotice,
  TeacherAddNotice,
  TeacherUpdateNotice,
  TeacherNotice,
  TeacherNoticeDetails,
  RequestList,
  ManageTeachers,
  ManageStudents,
  ManageCourses,
  AddCourse,
  CourseDetails,
  UpdateCourse,
  PaymentList,
  ClaimFee,
  MakeClass,
  DirectorNotice,
  AddNotice,
  UpdateNotice,
  NoticeDetails,
  DirectorProfile,
  DirectorProfileUpdate,
  FindId,
  AddTest,
  ScoreList,
} from './pages';
import { PATH } from './route/path';
import { useUserAuthStore } from './store';
import ResetPassword from './pages/login/resetPassword';

function App() {
  const { user } = useUserAuthStore();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={PATH.root} element={<StartPage />}>
            <Route path="" element={<FirstPage />} />
            <Route path={PATH.SIGNUP} element={<SignUp />} />
            <Route path={PATH.LOGIN.ROOT} element={<Outlet />}>
              <Route path="" element={<Login />} />
              <Route path={PATH.LOGIN.FIND_ID} element={<FindId />} />
              <Route path={PATH.LOGIN.RESET_PW} element={<ResetPassword />} />
            </Route>
            <Route path={PATH.REGISTER_ACADEMY} element={<Register name={user.user_name} position="director" />} />
            <Route path={PATH.REGISTER_TEACHER} element={<Register name={user.user_name} position="teacher" />} />
          </Route>

          <Route path={PATH.TEACHER.ROOT} element={<Teacher />}>
            <Route path="" element={<TeacherHome />} />
            <Route path={PATH.TEACHER.CLASS.ROOT} element={<Outlet />}>
              <Route path="" element={<ClassHome />} />
              <Route path={PATH.TEACHER.CLASS.DETAIL.ROOT} element={<Outlet />}>
                <Route path="" element={<ClassPage />} />
                <Route path={PATH.TEACHER.CLASS.DETAIL.LECTURENOTICE.ROOT} element={<Outlet />}>
                  <Route path="" element={<CourseNotice />} />
                  <Route path={PATH.TEACHER.CLASS.DETAIL.LECTURENOTICE.ADD} element={<TeacherAddNotice />} />
                  <Route path={PATH.TEACHER.CLASS.DETAIL.LECTURENOTICE.UPDATE} element={<TeacherUpdateNotice />} />
                  <Route path={PATH.TEACHER.CLASS.DETAIL.LECTURENOTICE.DETAIL} element={<TeacherNoticeDetails />} />
                </Route>
                <Route path={PATH.TEACHER.CLASS.DETAIL.TEST.ROOT} element={<Outlet />}>
                  <Route path="" element={<TestList />} />
                  <Route path={PATH.TEACHER.CLASS.DETAIL.TEST.ADD} element={<AddTest />} />
                  <Route path={PATH.TEACHER.CLASS.DETAIL.TEST.DETAILS.ROOT} element={<Outlet />}>
                    <Route path="" element={<ScoreList />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path={PATH.TEACHER.NOTICE.ROOT} element={<Outlet />}>
              <Route path="" element={<TeacherNotice />} />
              <Route path={PATH.TEACHER.NOTICE.DETAILS} element={<TeacherNoticeDetails />} />
            </Route>
            <Route path="*" element={<NotFound path={PATH.TEACHER.ROOT} />} />
          </Route>

          <Route path={PATH.DIRECTOR.ROOT} element={<Director />}>
            <Route path="" element={<DirectorHome />} />
            <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.ROOT} element={<Outlet />}>
              <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.REQUESTLIST} element={<RequestList />} />
              <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.TEACHERS} element={<ManageTeachers />} />
              <Route path={PATH.DIRECTOR.MANAGE_MEMBERS.STUDENTS} element={<ManageStudents />} />
            </Route>
            <Route path={PATH.DIRECTOR.MANAGE_COURSES.ROOT} element={<Outlet />}>
              <Route path="" element={<ManageCourses />} />
              <Route path={PATH.DIRECTOR.MANAGE_COURSES.ADDCOURSE} element={<AddCourse />} />
              <Route path={PATH.DIRECTOR.MANAGE_COURSES.COURSEDETAILS} element={<CourseDetails />} />
              <Route path={PATH.DIRECTOR.MANAGE_COURSES.UPDATE} element={<UpdateCourse />} />
            </Route>
            <Route path={PATH.DIRECTOR.TUITION_FEES.ROOT} element={<Outlet />}>
              <Route path={PATH.DIRECTOR.TUITION_FEES.PAYMENTLIST} element={<PaymentList />} />
              <Route path={PATH.DIRECTOR.TUITION_FEES.CLAIM} element={<ClaimFee />} />
              <Route path={PATH.DIRECTOR.TUITION_FEES.MAKE_CLASS} element={<MakeClass />} />
            </Route>
            <Route path={PATH.DIRECTOR.NOTICE.ROOT} element={<Outlet />}>
              <Route path="" element={<DirectorNotice />} />
              <Route path={PATH.DIRECTOR.NOTICE.ADD} element={<AddNotice />} />
              <Route path={PATH.DIRECTOR.NOTICE.UPDATE} element={<UpdateNotice />} />
              <Route path={PATH.DIRECTOR.NOTICE.DETAILS} element={<NoticeDetails />} />
            </Route>
            <Route path={PATH.DIRECTOR.PROFILE.ROOT} element={<Outlet />}>
              <Route path="" element={<DirectorProfile />} />
              <Route path={PATH.DIRECTOR.PROFILE.UPDATE} element={<DirectorProfileUpdate />} />
            </Route>
            <Route path="*" element={<NotFound path={PATH.DIRECTOR.ROOT} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function FirstPage() {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 30 }}>
        Academy Pro
      </Typography>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/login">
        로그인
      </Button>
      <Button variant="contained" size="large" sx={{ m: 1 }} fullWidth href="/signup">
        회원가입
      </Button>
    </>
  );
}

export default App;
