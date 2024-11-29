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
  PROFILE_IMAGE: (userId) => `/user/${userId}/image-info`,
  ACADEMY_INFO: '/user/academy-info',
  CANCEL_ACCOUNT: (userId) => `/user/${userId}`,
  CHECK_PW: '/user/check-password',
  // register
  REGISTER_ACADEMY: '/registeration/request/academy',
  REGISTER_TEACHER: '/registeration/request/user',

  // 공지
  NOTICE_LIST: (lectureId, page, pageSize) => `/notice/list?lecture_id=${lectureId}&page=${page}&page_size=${pageSize}`,
  NOTICE_RUD: (noticeId) => `/notice/${noticeId}`,
  NOTICE_CREATE: '/notice/create',

  // 원장
  // manage members
  REQUESTLIST: '/registeration/list/user',
  DECIDE_REGISTER: '/registeration/decide/user', // 사용자 승인 or 거절
  TEACHERLIST: (academyId) => `/teacher/${academyId}`,
  DELETE_TEACHER: '/teacher',
  STUDENTLIST: (academyId) => `/student/${academyId}`,
  DELETE_STUDENT: '/student',

  // examination (test)
  EXAM_CATEGORY: (academyId) => `/exam-type/academy/${academyId}`,
  ADD_CATEGORY: '/exam-type',
  DELETE_CATEGORY: (examTypeId) => `/exam-type/${examTypeId}`,
  SCORES: (lectureId, examId) => `/lecture/${lectureId}/exam/${examId}/score`,

  // manage lectures
  LECTURELIST: '/lecture',
  ATTENDEELIST: (lectureId) => `/lecture/${lectureId}/student`,
  ATTENDEE_PARENTLIST: (lectureId) => `/lecture/${lectureId}/parent`,
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
  BILLLIST: (academyId) => `/bill/${academyId}`,
  UPDATE_PAID: (academyId) => `/bill/${academyId}/pay`,

  // 강사
  // lectures
  GET_LECTURES: (id) => `/lecture?user_id=${id}`,
  GETEXAMLIST: (lectureId) => `/lecture/${lectureId}/exam`, // 시험 리스트
  GETQUIZLIST: (lectureId, quizId) => `/lecture/${lectureId}/exam?exam_type_id=${quizId}`,
  ADDEXAM: (lectureId) => `/lecture/${lectureId}/exam`,
  DELETEEXAM: (lectureId, testId) => `/lecture/${lectureId}/exam/${testId}`,

  // quiz
  CREATEQUIZ: '/quiz/create',
  QUIZDETAIL: (examId, quizNum) => `/quiz/${examId}/${quizNum}`,
};

export default PATH_API;
