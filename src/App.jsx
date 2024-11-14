import React from 'react';
import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { PrivateRoute, Director, Teacher } from './components';
import {
  StartPage,
  Login,
  SignUp,
  Register,
  NotFound,
  DirectorHome,
  TeacherHome,
  LectureHome,
  LecturePage,
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
  AddScore,
  ScoreGraph,
  ResetPassword,
  DirectorUpdatePassword,
  TeacherProfile,
  TeacherUpdateProfile,
  ChatRoom,
  QuizList,
  QuizDetail,
  QuizAdd,
} from './pages';
import { PATH } from './route/path';
import { useUserAuthStore } from './store';

function App() {
  const { isLoggedIn, user } = useUserAuthStore();
  const rolePath = user?.role === 'CHIEF' ? PATH.DIRECTOR.ROOT : PATH.TEACHER.ROOT;
  const hasRegistered = user?.academy_id !== null;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={PATH.root} element={isLoggedIn ? <Navigate to={rolePath} /> : <StartPage />}>
            <Route path="" element={<FirstPage />} />
            <Route path={PATH.SIGNUP} element={<SignUp />} />
            <Route path={PATH.LOGIN.ROOT} element={<Outlet />}>
              <Route path="" element={<Login />} />
              <Route path={PATH.LOGIN.FIND_ID} element={<FindId />} />
              <Route path={PATH.LOGIN.RESET_PW} element={<ResetPassword />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={PATH.TEACHER.ROOT} element={hasRegistered ? <Teacher /> : <Register position="teacher" />}>
              <Route path="" element={<TeacherHome />} />
              <Route path={PATH.TEACHER.PROFILE.ROOT} element={<Outlet />}>
                <Route path="" element={<TeacherProfile />} />
                <Route path={PATH.TEACHER.PROFILE.UPDATE} element={<TeacherUpdateProfile />} />
                <Route path={PATH.DIRECTOR.PROFILE.UPDATE_PW} element={<DirectorUpdatePassword />} />
              </Route>
              <Route path={PATH.TEACHER.CLASS.ROOT} element={<Outlet />}>
                <Route path="" element={<LectureHome />} />
                <Route path={PATH.TEACHER.CLASS.DETAIL.ROOT} element={<Outlet />}>
                  <Route path="" element={<LecturePage />} />
                  <Route path={PATH.TEACHER.CLASS.DETAIL.ALL} element={<ScoreGraph />} />
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
                      <Route path={PATH.TEACHER.CLASS.DETAIL.TEST.DETAILS.ADD} element={<AddScore />} />
                    </Route>
                  </Route>
                  <Route path={PATH.TEACHER.CLASS.DETAIL.QUIZ.ROOT} element={<Outlet />}>
                    <Route path="" element={<QuizList />} />
                    <Route path={PATH.TEACHER.CLASS.DETAIL.QUIZ.DETAIL} element={<QuizDetail />} />
                    <Route path={PATH.TEACHER.CLASS.DETAIL.QUIZ.ADD} element={<QuizAdd />} />
                  </Route>
                </Route>
              </Route>
              <Route path={PATH.TEACHER.COUNSELING} element={<ChatRoom />} />
              <Route path={PATH.TEACHER.NOTICE.ROOT} element={<Outlet />}>
                <Route path="" element={<TeacherNotice />} />
                <Route path={PATH.TEACHER.NOTICE.DETAILS} element={<TeacherNoticeDetails />} />
              </Route>
              <Route path="*" element={<NotFound path={PATH.TEACHER.ROOT} />} />
            </Route>
            <Route path={PATH.DIRECTOR.ROOT} element={hasRegistered ? <Director /> : <Register position="director" />}>
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
                <Route path={PATH.DIRECTOR.PROFILE.UPDATE_PW} element={<DirectorUpdatePassword />} />
              </Route>
              <Route path="*" element={<NotFound path={PATH.DIRECTOR.ROOT} />} />
            </Route>
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
