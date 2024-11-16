import { SECRET } from '../config/secret';

export const PATH_API = {
  API_DOMAIN: SECRET.server_ip,

  // user
  SIGN_IN: '/user/login',
  FIND_ID: '/user/find-id',
  RESET_PW: '/user/reset-password',
  SIGN_UP: '/user/signup',
  CHECK_DUP: '/user/check-id',
  SIGN_OUT: '/user/logout',
  REISSUE_TOKEN: '/user/refresh-token',
  PROFILE_BASIC: (userId) => `/user/${userId}/basic-info`,
  CANCEL_ACCOUNT: (userId) => `/user/${userId}`,
  // register
  REGISTER_ACADEMY: '/registeration/request/academy',
  REGISTER_TEACHER: '/registeration/request/user',

  // 원장
  // manage members
  REQUESTLIST: '/registeration/list/user',
  DECIDE_REGISTER: '/registeration/decide/user', // 사용자 승인 or 거절
  TEACHERLIST: (academyId) => `/teacher/${academyId}`,
  DELETE_TEACHER: '/teacher',
  STUDENTLIST: (academyId) => `/student/${academyId}`,
  DELETE_STUDENT: '/student',

  // manage lectures
  LECTURELIST: '/lecture',
  ATTENDEELIST: (lectureId) => `/lecture/${lectureId}/student`,
  ADD_LECTURE: '/lecture',
  DELETE_LECTURE: (lectureId) => `/lecture/${lectureId}`,
  UPDATE_LECTURE: (lectureId) => `/lecture/${lectureId}`,
  UPDATE_ATTENDEES: (lectureId) => `/lecture/${lectureId}/student`,

  // tuition fees
  CLASSLIST: (academyId) => `/expense/${academyId}`,
  MAKE_BILL: '/bill',
  MAKE_CLASS: (academyId) => `/expense/${academyId}`,
  UPDATE_CLASS: (academyId, classId) => `/expense/${academyId}/${classId}`,
  DELETE_CLASS: (academyId, classId) => `/expense/${academyId}/${classId}`,

  // 강사
  // lectures
  GET_LECTURES: (id) => `/lecture?user_id=${id}`,
};

export default PATH_API;
